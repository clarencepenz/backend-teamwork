const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const commentsGif = require('../controllers/commentsGif');
const auth = require('../middleware/auth');


router.post('/:gif_id/comments', auth,  commentsGif.createComment);
router.get('/:gif_id/comments', auth,  commentsGif.getComments);

module.exports = router;