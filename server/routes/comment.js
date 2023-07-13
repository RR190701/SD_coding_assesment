//A private route that will be only
const express = require('express');
const router =  express.Router();
const { protect } = require('../middlewares/auth');
const { AddComment, getAllComment } = require('../controllers/comment');

router.route("/addComment").post(protect, AddComment);
router.route("/getAllComments/:fileName").get(protect, getAllComment);

module.exports = router;