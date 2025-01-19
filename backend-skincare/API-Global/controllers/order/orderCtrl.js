const Orders = require('../../models/order/orderModel');
const OrderItems = require('../../models/order/orderItemModel');
const Products = require('../../models/productModel');
const typeCtrl = require('../typeCtrl');
const Type = require('../../models/typeModel');
const authMe = require('../../middleware/authMe');
const productCtrl = require('../productCtrl');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const paypalCtrl = require('./paypalCtrl');
const axios = require('axios');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const Voucher = require('../../models/voucherModel')

const orderCtrl = {
    CreateOrderKoh: async (req, res) => {
        try {
          const { phone, address, user_id } = req.body;
          const user = await User.findById(user_id);
          if (!user) {
            return res.status(400).json({ msg: 'User does not exist.' });
          }
      
          const cart = user.cart;
          let total = 0;
          for (let i = 0; i < cart.length; i++) {
            const product = await Products.findById(cart[i]._id);
            if (!product) {
              return res.status(400).json({ msg: 'Product not found.' });
            }
            const purchasedPrice = cart[i].price;
            total += purchasedPrice * cart[i].quantity;
            cart[i].price = purchasedPrice;
            if (cart[i].colors.sizes.quantity === 0) {
              return res.status(400).json({ msg: 'The product is out of stock.' });
            }
            if (cart[i].colors.sizes.quantity < cart[i].quantity) {
              return res.status(400).json({ msg: 'Not enough products. please reduce.' });
            }
            await product.save();
          }
      
          const order = new Orders({
            user_id: user_id,
            email: user.email,
            name: user.name,
            address: address,
            phone: phone,
            listOrderItems: cart,
            total: total,
            status: 'Pending',
            paymentMethod: 'COD',
          });
      
          await order.save();
          user.cart = [];
          await user.save();
          return res.json({ msg: 'Order placed successfully.', order: order });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },                  
    updateOrderStatusAdmin: async (req,res) => {
        const orderId  = req.params.id;
        const {status} = req.body;
        try {
            const order = await Orders.findByIdAndUpdate(orderId, { status }, { new: true });
            if (!order) {
                return res.status(404).json({ msg: 'Order not found.' });
            }
            if(order.status === 'Delivered' || order.status === 'Confirmed' || order.status === 'Shipping' || order.status === 'Cancelled' || order.status === 'Paid'){
                const user = await User.findById(order.user_id);
                if (!user) {
                    return res.status(404).json({ msg: 'User not found.' });
                }
                const email = user.email;
                const name = user.name;
                const phone = user.phone;
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'koke1150199@gmail.com',
                        pass: 'nanozlpbkistsqrp'
                    }
                });
                const currentTime = new Date().toLocaleString();
                const total = order.total;
                const listOrderItems = order.listOrderItems;
                const mailOptions = {
                    from: 'koke1150199@gmail.com',
                    to: email,
                    subject: 'Notification order tracking ',
                    html: `
                    <html>
                    <body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
                    <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px green;">
                      <thead>
                        <tr>
                          <th style="text-align:left;"><img style="max-width: 150px;" src="https://res.cloudinary.com/dkiofoako/image/upload/v1684836528/PBL/techinn_1_vtxuk0.svg" alt="Lao Technology" /></th>
                          <th style="text-align:right;font-weight:400;">${currentTime}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="height:35px;">${order.status === "Cancelled" ? `<h2>Sorry for canceling your order because the store has a problem, so it can't deliver the goods to the customer. Try to buy new product again</h2>` : `<h2>Thank you for buying and trusting the shop. ${order.status === "Delivered" ? `<h2>Your item has been delivered</h2>` : ``}</h2>`}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
                              ${order.status === "Cancelled" ? `<p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:red;font-weight:normal;margin:0">${order.status}</b></p>
                              ` : `<p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">${order.status}</b></p>
                              `}
                            <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Transaction ID</span> ${orderId}</p>
                            <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order amount</span> USD. ${total}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="height:35px;"></td>
                        </tr>
                        <tr>
                          <td style="width:50%;padding:20px;vertical-align:top">
                            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${name}</p>
                            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> ${email}</p>
                            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> +${phone}</p>
                            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">ID No.</span> ${order.user_id}</p>
                          </td>
                          <td style="width:50%;padding:20px;vertical-align:top">
                            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Address</span> ${order.address}</p>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="font-size:20px;padding:30px 15px 0 15px;">Items</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding:15px;">
                              ${listOrderItems.map(item => `
                                  <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">${item.title}</span> USD. ${item.price} <b style="font-size:12px;font-weight:300;"> /${item.amount}</b></p>
                                  <img src=${item.images.url} alt="order image" width=200px/>
                              `)}
                          </td>
                        </tr>
                      </tbody>
                      <tfooter>
                        <tr>
                          <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
                            <strong style="display:block;margin:0 0 10px 0;">Regards</strong> Lao Technology<br> Lao, Champasack, Pakse , 002132<br><br>
                            <b>Phone:</b> 0888946837<br>
                            <b>Email:</b> Soukthavilay2000@gmail.com
                          </td>
                        </tr>
                      </tfooter>
                    </table>
                  </body>
                    </html>
                    `
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    console
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });
            }
            if (order.status === 'Delivered') {
              try {
                const od = order.listOrderItems;
                for (let i = 0; i < od.length; i++) {
                  const product = await Products.findById(od[i]._id);
                  const orderQuantity = od[i].quantity;
                  if (!product) {
                    return res.status(400).json({ msg: 'Product not found.' });
                  }
                  const productColor = product.colors.find(color => color._id === od[i].colors._id);
                  if (productColor) {
                    const productSize = productColor.sizes.find(size => size._id === od[i].colors.sizes._id);
                    if (productSize) {
                      productSize.quantity -= od[i].quantity;
                    }
                  }
                  
                  // product.amount -= orderQuantity;
                  product.sold += orderQuantity;
                  await product.save();
                }
                // Gửi phản hồi thành công nếu không có lỗi
                res.status(200).json({ msg: 'Products updated successfully.' });
              } catch (error) {
                console.error(error);
                // Gửi phản hồi lỗi nếu có ngoại lệ xảy ra
                res.status(500).json({ msg: 'Internal Server Error.' });
              }
            }            
            await order.save();
            res.json({ msg: 'Order status updated successfully.', order });
            } catch (error) {
                res.status(500).json({ msg: error.message });
            }
    },
    userCancelOrder : async (req, res) => {
        try {
            const order_id = req.params.id;
            const {cancellationReason} = req.body;
            const order = await Orders.findById(order_id);
            if(!order){
                return res.status(404).json({ msg: 'Order not found.' });
            }
            if (order.status !== 'Pending') {
                return res.status(400).json({ msg: 'Order cannot be canceled. Order has been confirmed' });
            }
            order.cancellationReason = cancellationReason;
            order.status = 'Cancel Requested';
            await order.save();
            return res.json({ msg: 'Order cancellation requested.' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getOrdersWithCancelRequested: async (req, res) => {
        try {
            const orders = await Orders.find({ status: "Cancel Requested" });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    addTypeToOrder: async (req, res) => {
        try {
            const { product_id, type_id, amount } = req.body;
            const userID = await authMe(req);
            const user = User.findById(userID);
            var order = await Orders.findOne({ user_id: userID, status: 'Pending' });
            if (!order) {
                order = Orders({
                    user_id: userID,
                    status: 'Pending',
                    address: user.address ?? "Address",
                    phone: user.phone ?? "0123456789"
                });
            }
            if (order.status == 'Pending') {
                var product;
                try {
                    product = await Products.findById(product_id);
                }
                catch (err) {
                    res.send({ message: "Product not found" });
                }
                if (product) {
                    for (var i = 0; i < product.types.length; i++) {
                        if (type_id == product.types[i]._id) {

                            if (amount > product.types[i].amount) {
                                res.status(400).json({ message: "Not enough amount" });
                                return;
                            }
                            else if (amount <= 0) {
                                res.status(400).send({ message: "Amount must be greater than 0" });
                                return;
                            }
                            else {
                                for (var j = 0; j < order.listOrderItems.length; j++) {
                                    if (order.listOrderItems[j].type_id == type_id && order.listOrderItems[j].product_id == product_id) {

                                        //amount
                                        if (order.listOrderItems[j].amount + amount > product.types[i].amount) {
                                            res.status(400).send({ message: "Not enough amount" });
                                            return;
                                        }
                                        order.listOrderItems[j].amount += amount;
                                        product.types[i].amount = product.types[i].amount - amount;
                                        await Products.findByIdAndUpdate(product_id, { types: product.types });

                                        //price
                                        let price = 0;
                                        order.listOrderItems.forEach((item) => {
                                            price += item.amount * item.price;
                                        });
                                        order.total = price;

                                        //save
                                        await Orders.findByIdAndUpdate(order._id, { listOrderItems: order.listOrderItems, total: order.total });
                                        res.send(JSON.stringify(order));
                                        return;
                                    }
                                }


                                //types
                                var itemType = {
                                    product_id: product_id,
                                    type_id: type_id,
                                    amount: amount,
                                    image: product.images.url,
                                    product_name: product.title,
                                    price: product.types[i].price,
                                    type_name: product.types[i].name
                                }
                                listType = order.listOrderItems;
                                listType.push(itemType);
                                order.listOrderItems = listType;

                                //amount
                                if (product.types[i].amount < amount) {
                                    res.status(400).send({ message: "Not enough amount" });
                                    return;
                                }
                                product.types[i].amount = product.types[i].amount - amount;

                                //price
                                let price = 0;
                                order.listOrderItems.forEach((item) => {
                                    price += item.amount * item.price;
                                });
                                order.total = price;

                                //save
                                order.save();
                                await Products.findByIdAndUpdate(product_id, { types: product.types });
                                // await Orders.findByIdAndUpdate(order._id, { listOrderItems: order.listOrderItems, total: order.total });
                                res.send(JSON.stringify(order));
                            }
                            return;
                        }
                    }
                    res.send({ message: "Wrong type id" });
                }
                else {
                    return;
                }
            }
            else {
                res.status(400).send({ message: "Order is not pending" });
                return;
            }
        } catch (err) {
            console.log(err)
            console.log("Error: ", err.message)
        }
    },
    getCart: async (req, res) => {
        try {
            const userID = await authMe(req);
            const order = await Orders.findOne({ user_id: userID, status: 'Pending' });
            res.send(JSON.stringify(order));
        }
        catch (err) {
            res.status(400).json({ message: "Internal Server Error" })
        }
    },
    getOrdersbyID: async (req, res) => {
        try {
            const id = await authMe(req);
            if (!id) {
                return res.status(401).json({ msg: 'Unauthorized' });
            }
            const orders = await Orders.find({ user_id: id });
            res.json(orders);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // getOrders: async (req, res) => {
    //     try {
    //         const user_id = await authMe(req);
    //         const orders = await Orders.find({ user_id: user_id });
    //         res.send(orders)
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },
    getAllOrders: async (req, res) => {
        try {
            // const orders = await Orders.find(
            //     { "listOrderItems.0": { $exists: true } },
            //     {
            //         listOrderItems: 1,
            //         _id: 1,
            //         user_id: 1,
            //         status: 1,
            //         total: 1,
            //         createdAt: 1,
            //         address: 1,
            //         phone: 1,
            //     }
            // );
            const orders = await Orders.find();
            res.json({ orders });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { user_id, orderItems, address, phone } = req.body;
            await Orders.findOneAndUpdate({ _id: req.params.id }, {
                user_id, orderItems, address, phone
            })
            let price = 0;
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ product_id: orderItems[item].product_id });
                if (productItem) {

                    const orderItem = OrderItems({
                        order_id: req.params.id,
                        product_id: orderItems[item].product_id,
                        amount: orderItems[item].amount,
                        type_id: orderItems[item].type_id,
                    });
                    const itemPrice = await typeCtrl.getPricebyId(orderItems[item].type_id);
                    if (itemPrice === 0) {
                        res.send({ msg: "Wrong type id" });
                        return;
                    }
                    const itemAmount = await typeCtrl.getAmountbyId(orderItems[item].type_id);
                    if (itemAmount === 0) {
                        res.send({ msg: "Number of products available is zero" });
                        return;
                    }
                    price += itemPrice * orderItems[item].amount;
                    await orderItem.save();
                }
            }

            await Orders.findOneAndUpdate({ _id: req.params.id }, {
                user_id, orderItems, address, phone, total: price
            })
            res.send({ message: "Order update successfully" });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    checkoutOrder: async (req, res) => {
        const { order_id } = req.body;
        const order = await Orders.findOne({ _id: order_id });
        if (!order) {
            return res.status(400).send({ message: "Order not found" });
        }
        else {
            const amount = order.total;
            const address = order.address;
            await paypalCtrl.payment(res, amount, address, order_id);
        }
    },
    checkoutOrderSuccess: async (req, res) => {
        const order_id = req.params.id;
        await Orders.findOneAndUpdate({ _id: order_id }, {
            status: "Success"
        }, (err, doc) => {
            if (err) {
                res.send({ message: "Something went wrong" })
            }
            else {
                res.send({ message: "Order update successfully" });
            }
        })
    },
    checkoutOrderFail: async (req, res) => {
        const { order_id } = req.body;
        await Orders
            .findOneAndUpdate({ _id: order_id }, {
                status: "Fail"
            })
        res.send({ message: "Order update not successfully" });
    },
    getOrdersByTime: async (req, res) => {
        try {
          const { start, end } = req.body;
          const userID = await authMe(req);
          var endDate, startDate;
          try {
            endDate = new Date(end);
            startDate = new Date(start);
          } catch (err) {
            res.send({ err });
            return;
          }
          const orders = await Orders.find({
            createdAt: { $gte: startDate, $lte: endDate },
            user_id: userID,
          }, {
            createdAt: 1,
            total: 1,
            status: 1,
            listOrderItems: 1
          })
          .sort({ createdAt: -1 })
          .exec();
          res.send(orders);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: err.message });
        }
      },
    getMyOrder: async (req, res) => {
        try {
            const userID = await authMe(req);
            const orders = await Orders.find({
                user_id: userID,
                status: "Paid"
            }, {
                createdAt: 1,
                total: 1,
                status: 1,
                listOrderItems: 1,
                updatedAt: 1,
                phone: 1,
                address: 1,
                name: 1
            }).sort({ updatedAt: -1 });
            res.send(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server" });
        }
    },
    getDelivery: async (req, res) => {
        const GHNToken = process.env.GHNToken ?? "GHNToken";
        const delivery_id = req.query.delivery_id;
        if (!delivery_id) {
            res.status(400).json({ message: "delivery_id is required" })
            return;
        }
        axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
            {
                order_code: `${delivery_id}`
            },
            {
                headers: {
                    'Token': `${GHNToken}`
                }
            },
        ).catch(err => {
            if (err.response.data.code === 400 || err.response.data.code === 401) {
                res.status(err.response.data.code).json({ message: err.response.data.message })
            }
            else {
                res.status(500).json({ message: "Internal Server" })
            }
        }).then(data => {
            try {
                res.send(JSON.stringify(data.data))
            }
            catch (err) { }
        });
    },

    getOrderByCustomerId: function (req, res) {
        const userID = req.params.id;
        Orders.find({ user_id: userID }, (err, doc) => {
            if (err) {
                res.send({ message: "Something went wrong" })
            }
            else {
                res.send(doc);
            }
        })
    },
    updateOrderDetail: async (req, res) => {
        const { phone, name, address, order_id } = req.body;
        if (!phone || !name || !address || !order_id) {
            res.status(400).json({ message: "phone, name, address and order_id are required" })
            return;
        }
        try {
            const userId = await authMe(req);
            const order = await Orders.findOne({ _id: order_id, user_id: userId });
            if (!order) {
                res.status(400).json({ message: "Order not found" })
                return;
            }
            else {
                await Orders.findOneAndUpdate({
                    _id: order._id
                }, {
                    phone, name, address
                })
            }
            res.send({ message: "Order update successfully" });
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    removeOrderItem: async (req, res) => {
        const { order_id, product_id } = req.body;
        if (!order_id || !product_id) {
            res.status(400).json({ message: "order_id and product_id are required" })
            return;
        }
        try {
            const userId = await authMe(req);
            const order = await Orders.findOne({ _id: order_id, user_id: userId });
            if (!order) {
                res.status(400).json({ message: "Order not found" })
                return;
            }
            else {
                const listOrderItems = order.listOrderItems;
                const index = listOrderItems.findIndex(item => item.product_id === product_id);
                if (index === -1) {
                    res.status(400).json({ message: "Product not found" })
                    return;
                }
                else {
                    listOrderItems.splice(index, 1);
                    let price = 0;
                    for (let i = 0; i < listOrderItems.length; i++) {
                        price += listOrderItems[i].price * listOrderItems[i].amount;
                    }
                    order.total = price;
                    order.listOrderItems = listOrderItems;
                    await order.save();
                }
                res.send({ message: "Order update successfully" });
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    updateDelivery: async (req, res) => {
        const { delivery_id, order_id } = req.body;
        if (!delivery_id || !order_id) {
            res.status(400).json({ message: "delivery_id and order_id are required" })
            return;
        }
        try {
            await Orders.findOneAndUpdate({ _id: order_id }, { delivery: delivery_id });
        }
        catch (err) {
            console.log(err)
            res.send({ message: err.message });
        }
    },
    sales: async (req, res) => {
        try {
            const sales = await Products.aggregate([
                { $group: { _id: null, totalSold: { $sum: '$sold' }, products: { $push: '$$ROOT' } } }
            ]);
            const totalSales = sales.length > 0 ? sales[0].totalSold : 0;
            const soldProducts = sales.length > 0 ? sales[0].products : [];
            res.json({ totalSales, soldProducts });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    revenue: async (req, res) => {
        try {
            const orders = await Orders.find({ status: 'Delivered' });
            const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
            const deliveredOrders = orders;
            res.json({ totalRevenue, deliveredOrders });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    newUser: async (req, res)=>{
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            const newUsers = await User.find({ createdAt: { $gte: startDate } });
            res.json(newUsers);
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    statisticsCate: async (req, res)=>{
        try {
            // Thực hiện truy vấn để lấy thông tin thống kê sản phẩm theo danh mục
            const categoryStats = await Products.aggregate([
            { $group: { _id: '$category', totalProducts: { $sum: 1 } } }
        ]);
        
        res.json(categoryStats);
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        }
    },
    monthlyReport: async (req, res) => {
        try {
          let { year, month } = req.params;
          let startDate, endDate;
      
          // Check if year and month are provided
          if (!year || !month || typeof year === 'undefined' || typeof month === 'undefined') {
            // If not provided, get all statistics
            startDate = new Date(1970, 0, 1); // Set a default start date
            endDate = new Date(); // Set the current date as the end date
            year = 'All';
            month = 'All';
          } else {
            // If year and month are provided, calculate the start and end dates
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0);
          }
      
          const sales = await Products.aggregate([
            {
              $match: {
                $expr: {
                  $and: [
                    { $gte: ['$createdAt', startDate] },
                    { $lte: ['$createdAt', endDate] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalSold: { $sum: '$sold' },
              },
            },
          ]);
      
          const totalSales = sales.length > 0 ? sales[0].totalSold : 0;
      
          const orders = await Orders.find({
            status: 'Delivered',
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          })
            .sort({ createdAt: -1 })
            .limit(8); // Get the 8 most recent orders
      
          const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
      
          const newUsers = await User.find({
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          });
      
          const categoryStats = await Products.aggregate([
            {
              $match: {
                $expr: {
                  $and: [
                    { $gte: ['$createdAt', startDate] },
                    { $lte: ['$createdAt', endDate] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: '$category',
                totalProducts: { $sum: 1 },
                totalSold: { $sum: '$sold' },
              },
            },
            {
              $project: {
                category: '$_id',
                totalProducts: 1,
                totalSold: 1,
                soldPercentage: {
                  $cond: {
                    if: { $ne: [{ $sum: '$totalSold' }, 0] }, // Check if the sum is not zero
                    then: {
                      $multiply: [
                        { $divide: ['$totalSold', { $sum: '$totalSold' }] },
                        100,
                      ],
                    },
                    else: 0, // If sum is zero, set soldPercentage to 0
                  },
                },
              },
            },
          ]);
      
          const productData = await Products.find({
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          }).select('name sold');
      
          const report = {
            month,
            year,
            totalSales,
            totalRevenue,
            totalUsers: newUsers.length,
            totalOrders: orders.length,
            recentOrders: orders,
            categoryStats,
            productData,
          };
      
          res.json(report);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      monthlyStatistics: async (req, res) => {
        try {
          const currentYear = new Date().getFullYear();
          const statistics = [];
      
          for (let month = 1; month <= 12; month++) {
            const startDate = new Date(currentYear, month - 1, 1);
            const endDate = new Date(currentYear, month, 0);
      
            const orders = await Orders.countDocuments({
              status: 'Delivered',
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            });
      
            statistics.push({ month, totalOrders: orders });
          }
      
          res.json(statistics);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }  
}

module.exports = orderCtrl