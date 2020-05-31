const db = require('../db');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const fileUpload = require('express-fileupload');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true
  }));

  cloudinary.config({
    cloud_name: 'huwj1ufzc',
    api_key: 413813264741747,
    api_secret: 'iLTaIcuRVRQdpW2EmAieWviWmBs',
    cloudinary_url: process.env.CLOUDINARY_URL
});

console.log( cloudinary)


exports.getGifs =  async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM gifs  ORDER BY gid DESC")
        return res.json(results.rows)
      } catch (err) {
        return next(err);
      } 
      
  }

  exports.getGif =  async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM gifs WHERE gid=$1", [ req.params.gid ])
        return res.json(results.rows)
      } catch (err) {
        return next(err);
      } 
      
  }

  exports.deleteGif =  async (req, res, next) => {
    try {
        const result = await db.query("DELETE FROM gifs WHERE gid=$1", [req.params.gid])
            return res.json({msg: "deleted"})
          } catch (err) {
            return next(err);
          }
      
  }

  exports.createGif =  (req, res, next) => {
    const file = req.files.url;
     cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
      const data = result.url
      try{               
        const r = await db.query("INSERT INTO gifs(title, url, author, author_id, avatar, date) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *", 
                 [req.body.title, data, req.body.author, req.body.author_id, req.body.avatar]);
                 return res.json(r.rows) 
      }catch (err) { 
            return next(err)
       };
     });
   
  } 





