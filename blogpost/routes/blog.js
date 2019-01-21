var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");
var moment = require("moment");
var user = mongoose.model("User");
var bcrypt = require("bcrypt");
var blogController = require("../Controllers/blog");

//check for user
var isUser = (req, res, next) => {
  console.log(req.session.userId);
  let userId = req.session.userId;
  if (req.session.userId) {
    req.user = userId;
    res.locals.user = userId;
    next();
  } else {
    res.redirect("/login");
  }
};

// display the form
router.get("/", isUser, blogController.formRender);

// creating a new blog
router.post("/", blogController.postCreate);

//delete the blog post
router.get("/:id", blogController.postDelete);

// edit the blog post
router.get("/:id/edit", blogController.postEdit);

module.exports = router;
