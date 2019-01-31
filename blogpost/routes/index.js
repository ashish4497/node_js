var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var moment = require("moment");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");

var isUser = (req, res, next) => {
  console.log(req.session.userId);
  let userId = req.session.userId;
  if (req.session.userId) {
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
  blog.find({}).populate('author').exec((err, data) => {
    if (err) console.log(err);
    console.log(data[0])
    res.render("header", { blogs: data, moment: moment });
  })
  
})
    
//     , (err, data) => {

//   });
// });

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
