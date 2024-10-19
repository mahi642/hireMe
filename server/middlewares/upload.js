const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Set up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw", // Specify resource type as 'raw'
    format: async (req, file) => "pdf", // This should still work
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});



const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 2MB
});


module.exports = upload;
