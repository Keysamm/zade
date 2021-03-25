const cloudinary = require('cloudinary').v2;

if (!process.env.CLOUDINARY_NAME) {
  return res.status(400).json({
    errors: [
      {
        message: error || 'Отсутствует API ключ CLOUDINARY_NAME',
      },
    ],
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
