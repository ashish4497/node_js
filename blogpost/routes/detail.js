var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");
var detailController = require('../Controllers/detail')


//check for user
var isUser = (req, res, next) => {
  console.log(req.session.userId);
  let userId = req.session.userId;
  if (req.session.userId) {
    req.user = userId;
    // console.log(req.user ,"check userId")
    res.locals.user = userId;
    next();
  } else {
    res.redirect("/login");
  }
};

/* comment section */
// comment section for single user
router.post("/:id/comments",isUser, detailController.postComment);

// particular user comment
router.get("/:slug", isUser, detailController.singleBlogComment);

//delete comment
router.get("/:id/cmntdelete/:slug", isUser,detailController.deleteComment);
module.exports = router;

// edit the comment
router.get("/:id/commentEdit/:slug",isUser, detailController.editComment);

// router.post("/:id",detailController.renderComment);

//like button
router.get("/:userId/likes/:blogId", detailController.likeButton)