const { Client } = require("pg");
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({

  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
    // user:  process.env.USER,
    // password:  process.env.PASSWORD,
    // host:  process.env.HOST,
    // port:  process.env.PORT,
    // database:  process.env.DATABASE
  });
  
  client.connect()
  // .then(() => console.log('connected successfully'))
  // // .then(() => client.query( "select * FROM articles"))
  // // .then(results => console.table(results.rows))
  // .catch(e => console.log(e));

  module.exports = client; 