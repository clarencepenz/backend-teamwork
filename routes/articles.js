const express = require('express');
const router = express.Router();
const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');

router.post('/', auth, articlesCtrl.createArticle);
router.get('/:pid', auth, articlesCtrl.getArticle);
router.put('/:pid', auth, articlesCtrl.updateArticle);
router.put('/url/:author_id', auth, articlesCtrl.updateUrl);
router.delete('/:pid', auth, articlesCtrl.deleteArticle);
router.get('/', auth,  articlesCtrl.getArticles);


module.exports = router;  