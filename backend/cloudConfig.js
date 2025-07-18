const multer  = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tasya_dev/images",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tasya_dev/videos",
    allowedFormats: ["mp4", "mov"],
  },
});

const upload = multer({ imageStorage, videoStorage  });

module.exports = { cloudinary, upload };
