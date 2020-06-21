const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');


router.post('/:post_id/comments', auth, commentsCtrl.createComment);
router.get('/:post_id/comments/:cid', auth, commentsCtrl.getComment);
router.delete('/:post_id/comments/:cid', auth, commentsCtrl.deleteComment);
router.get('/:post_id/comments', auth,  commentsCtrl.getComments);
router.put('/:post_id/comments/:author_id', auth,  commentsCtrl.updateComment);

module.exports = router;