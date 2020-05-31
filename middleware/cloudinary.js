const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'huwj1ufzc',
     cloudinary_api_key: process.env.CLOUDINARY_API_KEY || '413813264741747',
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || 'iLTaIcuRVRQdpW2EmAieWviWmBs',
    cloudinary_url: process.env.CLOUDINARY_URL
});
module.exports = cloudinary;