
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

var parser = multer({ 
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Eduportal',
        format: 'jpg',  
        public_id: (req, file) => file.originalname,
      }

  })
});

module.exports = parser;