const mongoose = require('mongoose')


const replyFeedbackSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User'
    },
    feedback_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    username:{
        type:String,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("ReplyFeedbacks", replyFeedbackSchema)