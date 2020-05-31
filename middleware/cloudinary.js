const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
     cloud_name: process.env.CLOUD_NAME || 'huwj1ufzc',
    api_key: process.env.API_KEY || '413813264741747',
    api_secret: process.env.API_SECRET || 'iLTaIcuRVRQdpW2EmAieWviWmBs',
    connectionString: process.env.CLOUDINARY_URL
});
module.exports = cloudinary;