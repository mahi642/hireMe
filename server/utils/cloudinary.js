const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.resources({ type: "upload" }, (error, result) => {
  if (error) {
    console.error("Error fetching resources:", error);
  } else {
    // console.log("Uploaded files:", result.resources);
  }
});

module.exports = cloudinary;
