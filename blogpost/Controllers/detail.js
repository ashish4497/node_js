var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var blog = mongoose.model("blog");
var comments = mongoose.model("Comment");
var User = mongoose.model("User");


// comment section for single user
var postComment = function(req, res) {
  // console.log(req.session,"comment")
  var newComment = new comments(req.body);
  newComment.author =req.session.userId || req.session.passport.user;

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
  // console.log(req.session, 'got the session')
  blog
    .findOne({ slug: req.params.slug })
    .populate({
      path : "comments",
      populate : {path: "author", model : 'User'}
    })
    .exec((err, post) => {
      if (err) res.send(err);
      User.findById(res.locals.user,(err, user) => {
        res.render("detail", { detail: post, user:user });
      })
    });
}

// delete the  comment 
var deleteComment = function(req, res){
  // console.log(comments,"comments id find")
  comments.findByIdAndDelete(req.params.id, (err,data) => {
    // console.log(req.params.Id)
    // if(req.session.userId == data.author.toString())
    if(err) res.send(err);
    // console.log(data, "delete comment")
    // res.redirect("/detail");
    res.redirect("/detail/" +req.params.slug )
    // res.end()
  })
}

// edit the comment
var editComment= function(req, res){
  comments.findById(req.params.id,(err,data)=>{
    if(err) res.send(err)
    // console.log(data, "edit form info");
    res.render('editComment' ,{comment:data})
  })
}

//edit
// var renderComment = function(err, res){
//   // var newComment 
//   // console.log(res ,"display edit information")
//   comments.findById(req.params.id,(err,data) => {
//     if(err) console.log(err)
//     res.render('editComment',{edit : data})
//   })
// }

//like button
var likeButton = function(req, res) {
  blog.findByIdAndUpdate(req.params.blogId,
    {$push:{likes:req.params.userId}},
    {new:true},
    (err, data) =>{
      if(err) console.log(err)
      // console.log(data, "blog data found")
      res.redirect(`/detail/${data.slug}`)
    }
  )
}

module.exports = {
  postComment,
  singleBlogComment,
  deleteComment,
  editComment,
  likeButton
}
