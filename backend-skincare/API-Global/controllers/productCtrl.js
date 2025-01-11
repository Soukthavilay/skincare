const Products = require('../models/productModel.js')
const Type = require('../models/typeModel.js')
const DetailProduct = require('../models/detailProductModel.js')
const feedbackCtrl = require('./feedback/feedbackCtrl.js');
const ProductRecommender = require('product-recommender');
const Recommender = require('../helpers/recommender.js');
// Filter, sorting and paginating


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal = lớn hơn hoặc bằng
        //    lte = lesser than or equal = nhỏ hơn hoặc bằng
        //    lt = lesser than = ít hơn
        //    gt = greater than = lớn hơn 
        // regex = search to nung sue 
        this.query.find(JSON.parse(queryStr))
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductsByCategory: async (req, res) => {
        try {
            const category = req.params.id;
            const products = await Products.find({ category: category });

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductsByBand: async (req, res) => {
        try {
            const band = req.params.id;
            const products = await Products.find({ band: band });

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { title, price, description, images, category, band, colors } = req.body;
            if (!images)
                return res.status(400).json({ msg: "No pictures to upload" });
            const product = await Products.findOne({ title: title });
            if (product)
                return res.status(400).json({ msg: "This product already exists." });
            const newProduct = new Products({
                title: title,
                description: description,
                images: images,
                category: category,
                price: price,
                band:band,
                colors: colors,
            });
            await newProduct.save();
            res.json({ msg: "Product create!", newProduct });
        } catch (err) {
            return res.status(500).json({ msg: "Internal Server" });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Delete product success" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductByCategoryBandTitle :async (req,res) => {
        try {
            const { category, band } = req.body;
            const products = await Products.find({
                category: category,
                band: band,
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateProduct: async (req, res) => {
        try {
          const productId = req.params.id;
          const {
            title,
            price,
            description,
            images,
            category,
            band,
            colors
          } = req.body;
      
          // Check if the product exists
          const existingProduct = await Products.findById(productId);
          if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
          }
      
          // Construct the update object
          const update = {
            title,
            price,
            description,
            images,
            category,
            band,
            colors
          };
      
          // Update the product
          const updatedProduct = await Products.findByIdAndUpdate(productId, update, { new: true });
      
          res.json({ message: 'Product updated successfully', data: updatedProduct });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    getTopSoldProduct : async (req,res)=>{
        try {
            const products = await Products.aggregate([
                {$sort: {sold:-1}},
                {$limit:10}
            ]);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }, 
    searchProduct: async (req, res) => {
        try {
            const keyword = req.query.key;
            const products = await Products.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { band: { $regex: keyword, $options: 'i' } }
                ]
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getDetailFeedback: async (req, res) => {
        try {
            const productId = req.params.id
            const product = await Products.findOne({ _id: productId })
            const feedback = await feedbackCtrl.getFeedbackByProductID(product);
            res.json({feedback})
        }
        catch (error) {
            res.send(JSON.stringify(error))
        }
    },
    buyProduct: async (amount, typeId, productId) => {
        console.log("amount: " + amount + " typeId: " + typeId);
        const product = await Products.findOne({ _id: productId });
        const types = product.types.map((type) => {
            if (type._id == typeId) {
                type.amount = type.amount - amount;
            }
        });
        console.log(types)
        // if (type.amount < amount) {
        //     return false;
        // } else {
        //     await Type.findOneAndUpdate({
        //         amount: type.amount - amount
        //     });
        //     return true
        // }
    },
    recommender: async (req, res) => {
        try {
            const userId = req.params.uid;
            var topProduct = await Recommender.recommender(userId);
            var listProductId = topProduct.map(item => item[0]);
            var result = await Products.find({ _id: { $in: listProductId } });
            res.status(200).json({result})
        }
        catch (error) {
            res.send(JSON.stringify(error))
        }
    }

}
module.exports = productCtrl