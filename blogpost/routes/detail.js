var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");
var detailController = require('../Controllers/detail')


/* comment section */
// comment section for single user
router.post("/:id/comments",detailController.postComment);

// particular user comment
router.get("/:slug",detailController.singleBlogComment);

//delete comment
router.get("/:id/cmntdelete",detailController.deleteComment);
module.exports = router;

// edit the comment
router.get("/:id/commentEdit",detailController.editComment)
