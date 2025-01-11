const Feedbacks = require("../../models/feedback/feedbackModel");
const Products = require("../../models/productModel");
const authMe = require("../../middleware/authMe");
const User = require("../../models/userModel");
const FeedbackReply = require('../../models/feedback/replyFeedbackModel');

const feedbackCtrl = {
  createFeedback: async (req, res) => {
    try {
      const { image_url, rating, content, product_id } = req.body;
      const userID = await authMe(req);
      if (!userID) {
        res.status(401).json({ message: "Please login to continue" });
        return;
      }
      const product = await Products.findOne({ _id: product_id });
      if (!product) {
        res.status(400).json({ message: "Product not found" });
        return;
      }
      const user = await User.findOne({ _id: userID }, { name: 1, _id: 1 });
      const feedback = new Feedbacks({
        content: content,
        rating: rating,
        image_url: image_url,
        product_id: product_id,
        username: user.name,
        user_id: user._id,
      });
      await feedback.save()
      res.json({feedback});

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server" });
    }
  },
  replyFeedback : async (req, res) => {
    try {
      const { content, feedback_id, user_id } = req.body;
      const user =  await User.findById(user_id)// Lấy thông tin người dùng từ middleware xác thực (ví dụ: auth)
  
      const feedbackReply = new FeedbackReply({
        content,
        feedback_id,
        username : user.name,
        user_id : user._id,
      });
  
      await feedbackReply.save();
  
      res.json({ message: 'Reply feedback created successfully', feedbackReply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getReplyFeedbackByFeedbackID : async (req, res) => {
    try {
      const { id } = req.params.id;
  
      const feedbackReplies = await FeedbackReply.find({ feedback_id: id });
  
      res.json({ feedbackReplies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getFeedbackByProductID: async (productId) => {
    try {
      const feedbacks = await Feedbacks.find({ product_id: productId });
      return feedbacks;
    } catch (error) {
      return 0;
    }
  },
};
module.exports = feedbackCtrl;
