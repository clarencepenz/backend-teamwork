const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const commentsGif = require('../controllers/commentsGif');
const auth = require('../middleware/auth');


router.post('/:post_id/comments', auth, commentsCtrl.createComment);
router.get('/:post_id/comments/:cid', auth, commentsCtrl.getComment);
router.delete('/:post_id/comments/:cid', auth, commentsCtrl.deleteComment);
router.get('/:post_id/comments', auth,  commentsCtrl.getComments);

module.exports = router;