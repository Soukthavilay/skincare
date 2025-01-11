const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({

    image_url: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    reply:{
        type: String,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedbackReply',
    }],
}, {
    timestamps: true
})


module.exports = mongoose.model("Feedbacks", feedbackSchema)