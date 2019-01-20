var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");
var moment = require("moment");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");

var isUser = (req, res, next) => {
  console.log(req.session.userId)
  let userId = req.session.userId;
  if (req.session.userId) {
    User.findById(userId,(err, user)=>{
      req.user = user;
      res.locals.user = user;
      next();
    })
  } else{
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
    console.log(err, user);
    if (err) res.send(err);
    if (!user) res.send("not match");
    if (!bcrypt.compareSync(password, user.password)) {
      res.send("wrong password");
    }
    req.session.userId = user._id;
    res.redirect("/");
  });
});

/* comment section */

router.post("/detail/:id/comments", function(req, res) {
  var newComment = new comments(req.body);
  newComment.save((err, comment) => {
    if (err) console.log(err);
    blog.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: comment._id } },
      { new: true },
      (err, data) => {
        if (err) res.send(err);
        console.log(data, "comment section data");
      }
    );
    res.redirect(`/detail/${req.params.id}`);
  });
});

router.get("/register", function(req, res) {
  res.render("signUp");
});

router.post("/register", function(req, res) {
  var newSignUp = new req.body();
  newSignUp.save((err, User) => {
    if (err) res.send(err);
    res.redirect("/register");
  });
});

/* GET home page. */

router.post("/users/blog", function(req, res, next) {
  var newBlog = new blog(req.body);
  newBlog.save((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

router.get("/", isUser, function(req, res) {
  blog.find({}, (err, data) => {
    if (err) console.log(err);
    res.render("header", { blogs: data, moment: moment });
  });
});

router.get("/detail/:id", function(req, res) {
  blog
    .findOne({ _id: req.params.id })
    .populate("comments")
    .exec((err, post) => {
      if (err) res.send(err);
      res.render("detail", { detail: post });
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

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/')
})

// var isUser = (req,res,next) => {
//   if(req.session.userId){
//     req.user = user;
//     res.locals.user = user;
//     next()
//   }
//   res.redirect('/login')
// }

module.exports = router;
