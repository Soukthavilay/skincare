const router = require('express').Router()
const voucherCtrl = require('../controllers/voucherCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/voucher', auth,authAdmin,voucherCtrl.createVoucher);
router.get('/voucher', auth,authAdmin,voucherCtrl.getVoucher);
router.get('/voucher/:id', auth,authAdmin,voucherCtrl.editVoucher);

module.exports = router