const router = require('express').Router()
const feedbackCtrl = require('../controllers/feedback/feedbackCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/feedback/create')
    .post(auth, feedbackCtrl.createFeedback)
    
router.route('/feedback/replyFeedback')
    .post(auth,authAdmin, feedbackCtrl.replyFeedback)

router.route('/feedback/:id')
    .get(feedbackCtrl.getFeedbackByProductID)

module.exports = router