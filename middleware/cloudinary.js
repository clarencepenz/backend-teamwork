const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
    connectionString: process.env.CLOUDINARY_URL
});
module.exports = cloudinary;