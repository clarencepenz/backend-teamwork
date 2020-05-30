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
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


exports.getArticles =  async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM articles ORDER BY pid DESC")
        return res.json(results.rows)
      } catch (err) {
        return next(err);
      } 
      
  }

  exports.getArticle =  async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM articles WHERE pid=$1", [ req.params.pid ])
        return res.json(results.rows)
      } catch (err) {
        return next(err);
      } 
      
  }

  exports.deleteArticle =  async (req, res, next) => {
    try {
        const result = await db.query("DELETE FROM articles WHERE pid=$1", [req.params.pid])
            return res.json({ result: "Deleted" })
          } catch (err) {
            return next(err);
          }
      
  }

  exports.createArticle =  async (req, res, next) => {
    const { title, body, author, author_id, url} = req.body;
    db.query(
      'INSERT INTO articles (title, body, author, author_id, url, date) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING pid',
      [title, body, author, author_id, url],
      (error, results) => {
        if (error) {
          res.status(400).json({
            status: 'error',
            error
          }); 
        }
        res.status(201).json({
          status: 'success',
          data: {
            message: 'Article Created Successfully',
            articleId: results.rows[0].pid,
            title,
            body, 
            author,
            author_id,
            url
          }
        });
      }
    ); 
      
  }



exports.updateArticle =  async (req, res, next) => {
        try {
                const result = await db.query(
                "UPDATE articles SET title=$1, body=$2  WHERE pid=$3 RETURNING *", [req.body.title, req.body.body, req.params.pid]
                )
                  
                return  res.json(result.rows); 
               
            } catch (err) {
                return next(err);
            }
          
      }

      
      exports.updateUrl =  async (req, res, next) => {
        try {
          const result = await db.query(
          "UPDATE articles SET url=$1  WHERE author_id=$2 RETURNING author_id", [req.body.url,  req.params.author_id]
          )
         
          return  res.json(result.rows)
      } catch (err) {
          return next(err);
      }
       
      }




