const router = require('express').Router()
const band = require('../controllers/bandCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/band')
    .get(band.getBand)
    .post(band.createBand)
    .put(band.updateBand)


module.exports = router