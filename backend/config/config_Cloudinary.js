const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key_cloundinary,
  api_secret: process.env.api_secret_cloundinary,
});

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "shoe_website_assets", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Allowed file formats
    // transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize images
  },
});

// Set up multer with Cloudinary storage
const upload = multer({ storage });

module.exports = { cloudinary, upload };
