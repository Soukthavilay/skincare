const router = require('express').Router()
const { updateOrder } = require('../controllers/order/orderCtrl')
const orderCtrl = require('../controllers/order/orderCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authMe = require('../middleware/authMe')

router.route('/orders')
    .get(orderCtrl.getOrdersbyID)
    .put(auth, orderCtrl.updateOrderDetail)
    .delete(auth, orderCtrl.removeOrderItem)
    

router.route('/order-by-customer/:id').get(auth, orderCtrl.getOrderByCustomerId)
router.route('/createOrder').post(orderCtrl.CreateOrderKoh)
router.route('/report/:year?/:month?').get(orderCtrl.monthlyReport)
router.route('/statistics/allMonth').get(orderCtrl.monthlyStatistics)

// thong ke 
router.route('/statistics/sales')
    .get(orderCtrl.sales)

    router.route('/statistics/revenue')
    .get(orderCtrl.revenue)

router.route('/statistics/newUser')
    .get(orderCtrl.newUser)

router.route('/statistics/cate')
    .get(orderCtrl.statisticsCate)

router.route('/orders/admin')
    .get(auth, authAdmin, orderCtrl.getAllOrders)

router.route('/orders/:id')
    .put(orderCtrl.updateOrder)

// update order
router.route('/orders/cancel-request/:id').put(auth,orderCtrl.userCancelOrder);
router.route('/order/cancel-request').get(auth,authAdmin,orderCtrl.getOrdersWithCancelRequested)
router.route('/update-status/:id').put(auth,authAdmin,orderCtrl.updateOrderStatusAdmin);

router.route('/cart')
    .get(auth, orderCtrl.getCart)
    .put(auth, orderCtrl.addTypeToOrder)

router.route('/history')
    .get(auth, orderCtrl.getMyOrder)

router.route('/orders/time').get(orderCtrl.getOrdersByTime)

router.route('/cart/checkout')
    .post(auth, orderCtrl.checkoutOrder)

router.route('/delivery')
    .get(orderCtrl.getDelivery)
    .put(auth, authAdmin, orderCtrl.updateDelivery)

module.exports = router