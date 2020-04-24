const express = require('express');
const router = express.Router();
const gifsCtrl = require('../controllers/gifs');
const auth = require('../middleware/auth');

router.post('/', auth,  gifsCtrl.createGif);
router.get('/:gid', auth, gifsCtrl.getGif);
router.delete('/:gid', auth, gifsCtrl.deleteGif);
router.get('/', auth,  gifsCtrl.getGifs);


module.exports = router;