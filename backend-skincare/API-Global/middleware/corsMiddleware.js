const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Thay đổi thành địa chỉ tên miền hoặc IP của ứng dụng frontend của bạn
  // credentials: true, // Cho phép chia sẻ cookie
};

module.exports = cors(corsOptions);