const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//connecting cloudinary to backend
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret:process.env.CLOUD_API_SECRET
});
//folder in which file is stored
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'AirbnbClone_DEV',
      allowedformats: ["png","jpg","jpeg"]
    },
});

module.exports = {
    cloudinary,
    storage
};