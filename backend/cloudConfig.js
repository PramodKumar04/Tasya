const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Create separate storage configurations
const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "tasya_dev/images",
        allowedFormats: ["jpg", "png", "jpeg"],
        resource_type: "image"
    },
});

const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "tasya_dev/videos",
        allowedFormats: ["mp4", "mov", "avi"],
        resource_type: "video"
    },
});


const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 50 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'image') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed for image field'));
            }
        } else if (file.fieldname === 'video') {
            if (file.mimetype.startsWith('video/')) {
                cb(null, true);
            } else {
                cb(new Error('Only video files are allowed for video field'));
            }
        } else {
            cb(new Error('Unexpected field'));
        }
    }
});

module.exports = { cloudinary, upload, imageStorage, videoStorage };