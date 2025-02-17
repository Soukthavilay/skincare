require('dotenv').config()
const Users = require('../models/userModel');
const Orders = require('../models/order/orderModel');
const Payments = require('../models/paymentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMe = require('../middleware/authMe');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      const existingUser = await Users.findOne({ email });
      if (existingUser)
        return res.status(400).json({ msg: 'The email already exists.' });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters long.' });

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

      // Save user with OTP
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        phone,
        otp,
        otpExpires,
      });
      await newUser.save();

      // Send OTP via email
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verify Your Email',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ msg: 'Please check your email to verify your account.' });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: err.message });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User not found.' });

      if (user.otp !== otp)
        return res.status(400).json({ msg: 'Invalid OTP.' });

      if (Date.now() > user.otpExpires)
        return res.status(400).json({ msg: 'OTP has expired.' });

      // OTP verified; clear otp fields and activate user
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        sameSite: 'none',
        secure: true,
      });

      res.json({ msg: 'Email verified successfully.', accesstoken, user });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Internal Server Error.' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        sameSite: 'none',
        secure: true,
      });

      res.json({ accesstoken, user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editPassword: async(req, res) => {
    try {
      const { oldPassword, newPassword, userId } = req.body;
      const user = await Users.findById(userId);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Old password is incorrect.' });
      }
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      user.password = newPasswordHash;
      await user.save();
      res.json({ msg: 'Password updated successfully.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      return res.json({ msg: 'Logged out' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      console.log(rf_token);
      if (!rf_token)
        return res.status(400).json({ msg: 'Please Login or Register' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: 'Please Login or Register' });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password')
      if(!user) return res.status(400).json({msg: "User does not exist."})
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUserAdmin: async (req, res) => {
    try {
      try {
        const users = await Users.find();
        const userWithOrderCount = [];
        // get order length of users
        for (const user of users) {
          const orderCount = await Orders.countDocuments({ user_id: user._id });
          
          userWithOrderCount.push({
              user: user,
              orderCount: orderCount
          });
      }
      res.json({
          status: 'success',
          result: users.length,
          users: userWithOrderCount
      });

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ msg: 'Added to cart' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });
      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, phone, userID, avatar } = req.body;
      const user = await Users.findById(userID);
      if (!user) return res.status(400).json({ message: "User does not exist." });
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (avatar) user.avatar = avatar;
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
