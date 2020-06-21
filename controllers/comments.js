const db = require('../db');

exports.getComments =  async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM comments WHERE post_id=$1", [ req.params.post_id])
        return res.json(results.rows)
      } catch (err) {
        return next(err);
      } 
      
  } 


  exports.getComment =  async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM comments WHERE cid=$1", [ req.params.cid ])
        return res.json(results.rows)
      } catch (err) {
        return next(err);
      } 
      
  }

  exports.deleteComment =  async (req, res, next) => {
    try {
        const result = await db.query("DELETE FROM comments WHERE cid=$1", [req.params.cid])
            return res.json({ result: "Deleted" })
          } catch (err) {
            return next(err);
          }
      
  }

  exports.createComment =  async (req, res, next) => {
    try {
        const result = await db.query("INSERT INTO comments(comment, post_id, author, author_id, avatar, date) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
         [req.body.comment, req.body.post_id, req.body.author, req.body.author_id, req.body.avatar]);
            return res.json(result.rows)
          } catch (err) {
            return next(err)
          }
      
  }



  exports.updateComment =  async (req, res, next) => {
    try {
            const result = await db.query(
            "UPDATE comments SET avatar=$1  WHERE author_id=$2 RETURNING *", [req.body.avatar, req.params.author_id]
            )
            return res.json(result.rows)
        } catch (err) {
            return next(err);
        }
      
  }




