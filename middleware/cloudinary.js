const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
     cloud_name: 'huwj1ufzc' || 'huwj1ufzc',
    api_key: '413813264741747' || '413813264741747',
    api_secret: 'iLTaIcuRVRQdpW2EmAieWviWmBs' || 'iLTaIcuRVRQdpW2EmAieWviWmBs',
    connectionString: process.env.CLOUDINARY_URL
});
module.exports = cloudinary;