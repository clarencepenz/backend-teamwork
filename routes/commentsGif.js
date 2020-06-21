const express = require('express');
const router = express.Router();
const commentsGif = require('../controllers/commentsGif');
const auth = require('../middleware/auth');


router.post('/:gif_id/comments', auth,  commentsGif.createComment);
router.get('/:gif_id/comments', auth,  commentsGif.getComments);
router.put('/:gif_id/comments/:author_id', auth,  commentsGif.updateComment);

module.exports = router;