var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var User = mongoose.model("User");

// display the form
var formRender = function(req,res) {
  User.findById(res.locals.user,(err,data)=>{
    if(err) res.send(err)
    // console.log(data,"user info data")
    res.render("form",{user:data});
  })
};

// creating a new blog
var postCreate = function(req, res, next) {
  // console.log("++++++++++++++++++++++",req.session,"++++++++++++++++++++++++++")
  var newBlog = new blog(req.body);
  newBlog.author = req.session.userId || req.session.passport.user;
  newBlog.save((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

//delete the blog post
var postDelete = function(req, res) {
  blog.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

// edit the blog post
var postEdit = function(req, res) {
  blog.findById(req.params.id, (err, data) => {
    if (err) console.log(err);
    res.render("edit", { val: data });
    // res.redirect('/')
  });
};

module.exports = {
  postCreate,
  postDelete,
  formRender,
  postEdit
};
