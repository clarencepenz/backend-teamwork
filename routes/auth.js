const express = require('express');
const router = express.Router();
const checkCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');

router.get('/',  auth, checkCtrl.checkAuth);

module.exports = router;  