var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");
var moment = require("moment");
var user = mongoose.model("User");
var bcrypt = require("bcrypt");

//check for user
var isUser = (req, res, next) => {
  console.log(req.session.userId)
  let userId = req.session.userId;
  if (req.session.userId) {
    req.user = userId;
    res.locals.user = userId;
    next();
  } else{
    res.redirect('/login')
  }
};


router.get("/", isUser ,function(req, res, next) {
  res.render("form");
});

router.get("/:id", function(req, res) {
  blog.findOneAndDelete(req.params.id, (err, data) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

router.get("/:id/edit", function(req, res) {
  blog.findById(req.params.id, (err, data) => {
    if (err) console.log(err);
    res.render("edit", { val: data });
    // res.redirect('/')
  });
});

module.exports = router;
