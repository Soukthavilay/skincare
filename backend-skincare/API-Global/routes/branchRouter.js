const router = require('express').Router()
const branch = require('../controllers/branchCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/branch')
    .get(branch.getAllBranches)
    .post(branch.createBranch)
    .put(branch.updateBranch)


module.exports = router