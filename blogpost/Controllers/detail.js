var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");

// comment section for single user
var postComment = function(req, res) {
  // console.log(req.session,"comment")
  var newComment = new comments(req.body);
  newComment.author =req.session.userId

  newComment.save((err, comment) => {
    if (err) console.log(err);
    blog.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: comment._id } },
      { new: true },
      (err, data) => {
        if (err) res.send(err);
        res.redirect(`/detail/${data.slug}`);
        // console.log(data, "comment section data");
      }
    );
  });
}

// particular user comment
var singleBlogComment = function(req, res) {
  blog
    .findOne({ slug: req.params.slug })
    .populate("comments")
    .exec((err, post) => {
      if (err) res.send(err);
      res.render("detail", { detail: post });
    });
}

// delete the  comment 
var deleteComment = function(req, res){
  // console.log(comments,"comments id find")
  comments.findByIdAndDelete(req.params.id, (err,data) => {
    // if(req.session.userId == data.author.toString())
    if(err) res.send(err);
    // console.log(data, "delete comment")
    res.redirect(`/`);
    // res.end()
  })
}

// edit the comment
var editComment= function(req, res){
  comments.findById(req.params.id,(err,data)=>{
    if(err) res.send(err)
    console.log(data, "edit form info");
    res.render('editComment' ,{comment:data})
  })
}

module.exports = {
  postComment,
  singleBlogComment,
  deleteComment,
  editComment
}