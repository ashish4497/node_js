var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var moment = require("moment");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");
var passport = require("passport");

var isUser = (req, res, next) => {
  // console.log("================================");
  // console.log(req.session, "session");
  // console.log(req.userId, "check the user detail", req.locals);
  if (req.session.userId || req.isAuthenticated()) {
    let userId = req.session.userId || req.session.passport.user;
    User.findById(userId, (err, user) => {
      req.user = user;
      res.locals.user = user;
      next();
    });
  } else {
    // res.redirect('form')
    next();
  }
};

//github login section
router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log('github auth success')
    res.redirect("/");
  }
);

//login
router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", function(req, res) {
  var { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    // console.log(err, user);
    if (err) res.send(err);
    if (!user) res.send("not match");
    if (!bcrypt.compareSync(password, user.password)) {
      res.send("wrong password");
    }
    req.session.userId = user._id;
    res.redirect("/");
  });
});

router.get("/register", function(req, res) {
  res.render("signUp");
});

router.post("/register", function(req, res) {
  var newSignUp = new User(req.body);
  newSignUp.save((err, User) => {
    if (err) res.send(err);
    res.redirect("/login");
  });
});

/* GET home page. */

router.get("/", isUser, function(req, res) {
  // console.log(req.session,"session")
  blog
    .find({})
    .populate("author")
    .exec((err, data) => {
      console.log("-----------------------------",data,"populates data author")
      if (err) console.log(err);
      console.log("check the user name is define or not",data,"data in header")
      res.render("header", { blogs: data, moment: moment });
    });
});

router.post("/edit/:id", function(req, res) {
  blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) console.log(err);
      res.redirect("/");
    }
  );
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
