const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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


exports.updateProfile = async (req, res, next) => {
   
     try {
      const result = await db.query(
      "UPDATE users SET username=$1, about=$2  WHERE uid=$3 RETURNING *", [req.body.name, req.body.about, req.params.uid]
      )
        
      return  res.json(result.rows); 
     
  } catch (err) {
      return next(err);
  }


} 

exports.updateSocial = async (req, res, next) => {
   
  try {
   const result = await db.query(
   "UPDATE users SET twitter=$1, github=$2, facebook=$3  WHERE uid=$4 RETURNING *", [req.body.twitter, req.body.github, req.body.facebook, req.params.uid]
   )
     
   return  res.json(result.rows); 
  
} catch (err) {
   return next(err);
}


} 

exports.updateProfileUrl =  (req, res, next) => {
  const file = req.files.url;
 // console.log(file)
   cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
    const data = result.url
    try{                //res.send(data)
      const r = await db.query("UPDATE users SET  url=$1  WHERE uid=$2 RETURNING *", 
               [ data, req.params.uid]);
               return res.json(r.rows) 
    }catch (err) {
          return next(err)
     };
   });
 
} 


exports.getProfile =  async (req, res, next) => {
  try {
      const results = await db.query("SELECT * FROM users WHERE uid=$1", [ req.params.uid ])
      return res.json(results.rows)
    } catch (err) {
      return next(err);
    } 
    
}

// exports.getUrl =  async (req, res, next) => {
//   try {
//       const results = await db.query("SELECT * FROM users WHERE url=$1", [ req.params.url ])
//       return res.json(results.rows)
//     } catch (err) {
//       return next(err);
//     } 
    
// }

exports.getUsers = (request, res) => {
  db.query('SELECT * FROM users ORDER BY uid ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.createUser =  (req, res, next) => {
  const { username, email, password, } = req.body;
  bcrypt.hash(password, 10).then(hash => {
    db.query('INSERT INTO users ( username, email, password) VALUES ($1, $2, $3) RETURNING uid',
      [  username, email, hash],
      (error, results) => {
        if (error) {
          res.status(400).json({
            status: 'error',
            error
          });
        }
        const token = jwt.sign({ userId: results.rows[0].uid }, 'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h'
        });
        res.status(201).json({
          status: 'success',
          data: {
            token,
            message: 'User Created Successfully'
           
          }
        });
      }
    );
  });
  }


exports.getUser =   (request, res) => {
  const { email, password } = request.body;
 
  db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (results.rows.length < 1) {
      return res.status(401).json({ status: error, error: 'User with the email not found' });
    }
    const hash = results.rows[0].password;
    return bcrypt
      .compare(password, hash)
      .then(valid => {
        if (!valid) {
         res.status(401).json({ status: error, error: 'Incorrect password' });
        }
        const token = jwt.sign({ userId: results.rows[0].uid }, 'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h'
        });
       res.status(200).json({
          status: 'success',
          userId: results.rows[0].uid,
          author: results.rows[0].username,
          url: results.rows[0].url,
          token
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Cannot signin, do try again',
          err
        });
      });
  });
}



  // exports.getPosts =  async (req, res, next) => {
  //   try {
  //       const result = await db.query("SELECT * FROM articles WHERE user_id=$1", [req.body.user_id]);
  //           return res.json(result.rows)
  //         } catch (err) {
  //           return next(err)
  //         }
      
  // }