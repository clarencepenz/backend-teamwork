const jwt = require('jsonwebtoken');
const secret = 'RANDOM_TOKEN_SECRET';

module.exports = (req, res, next) => {
  
  try {
   const token = req.headers.authorization.split(' ')[1];
    
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const { uid } = decodedToken;
    if (req.body.uid && req.body.uid !== uid) {
      res.status(401).json({
        message: 'Invalid user ID',
        error: 'error'
      });
    } else {
      next(); 
    }
  } catch (error) {
    res.status(401).json({
      error: 'You are not logged in, please Login first',
      status: error
    });
    
  }
};
