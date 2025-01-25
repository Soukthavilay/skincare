const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const corsMiddleware = require('../middleware/corsMiddleware');


router.post('/register', userCtrl.register)
router.post('/verifyEmail', userCtrl.verifyEmail)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)
router.get('/allUser',auth,authAdmin, userCtrl.getAllUserAdmin)

router.get('/infor', auth, userCtrl.getUser)
    .put('/infor', auth, userCtrl.updateUser)

router.put('/changePassword', auth, userCtrl.editPassword);

router.patch('/addcart', auth, userCtrl.addCart)

router.get('/history', auth, userCtrl.history)


module.exports = router