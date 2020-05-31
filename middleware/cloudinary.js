const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'huwj1ufzc',
    api_key: process.env.CLOUDINARY_API_KEY || '413813264741747',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'iLTaIcuRVRQdpW2EmAieWviWmBs',
    cloudinary_url: process.env.CLOUDINARY_URL
});
module.exports = cloudinary;