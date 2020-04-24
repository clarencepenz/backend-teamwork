const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/login',  usersCtrl.getUser);
router.get('/all',  usersCtrl.getUsers);
router.post('/signup',   usersCtrl.createUser);
router.put('/profile/:uid',  usersCtrl.updateProfile);
router.put('/profile-url/:uid',  usersCtrl.updateProfileUrl);
router.put('/profile-social/:uid',  usersCtrl.updateSocial);
router.get('/profile/:uid',  usersCtrl.getProfile);



module.exports = router;