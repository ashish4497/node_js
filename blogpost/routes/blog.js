var express = require("express");
var router = express.Router();
var blogController = require("../Controllers/blog");
var mongoose = require("mongoose");
var User = mongoose.model("User");
//check for user
var isUser = (req, res, next) => {
  if (req.session.userId || req.isAuthenticated()) {
    let userId =req.session .userId ||  req.session.passport.user;
    User.findById(userId, (err, user) => {
      req.user = user;
      res.locals.user = user;
      // console.log(res.locals,"local")
      
      next();
    });
  } else {
    // res.redirect('form')
    next();
  }
};
// display the form
router.get("/", isUser, blogController.formRender);

// creating a new blog
router.post("/",isUser, blogController.postCreate);

//delete the blog post
router.get("/:id", blogController.postDelete);

// edit the blog post
router.get("/:id/edit", blogController.postEdit);
// router.post("/:id")

module.exports = router;
