var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var jwt = require("jsonwebtoken");
var User = require("../models/user");
var Comment = require("../models/comment");
var slug = require('slug');

// create middleware for check token valid or not
var validToken = (req, res, next) => {
  var token = req.headers.token;
  // console.log(req.headers,"===========")
  jwt.verify(token, "shhhhh", function(err, decode) {
    if (err) return res.json("invalid Token");
    console.log(decode, "token");
    var username = decode.username;
    User.findOne({ username: username }, (err, user) => {
      if (err) return res.json({ error: "user not found" });
      req.user = user;
    });
    next();
  });
};
/* article routes*/
// Article.find({},(err, data)=>{
//   console.log(data,"check the article schema")
// })

router.post("/articles", validToken, function(req, res, next) {
  // console.log("++++++");
  var newArticle = new Article(req.body);
  // console.log(req.body, "show articles");
  newArticle.save((err) => {
    if (err) res.send(err);
    if (!err) res.json({ article: newArticle });
  });
});

//edit article
router.put('/articles/:slug', validToken, function(req, res, next){
  console.log(req.body,"=====")
	Article.findOneAndUpdate({slug : req.params.slug},(req.body), {new:true}, (err,data)=> {
		if(err)res.send("not updated")
		if(!err)res.json({article: req.body});
	})
})

//delete article
router.delete('/articles/:slug', validToken, function(req, res, next){
	Article.findOneAndDelete(req.params.slug, (err, data)=>{
		if(err) res.json("article not delete")
		if(!err) res.json("deleted success")
	})
})

//create comment
router.post("/articles/:slug/comments", validToken, function(req, res, next) {
  // console.log(req.body,"comment section")
  var newComment = new Comment(req.body);
  newComment.save((err,comment) => {
    if(err) res.send(err)
    else
Article.findOneAndUpdate({slug: req.params.slug},{$push:{comments :comment._id}},(err,data)=>{
      if(err)res.send(err)
      else res.json(newComment);
    })
  });
});

// delete comment
router.delete('/articles/:slug/comments/:id',  validToken, function(req, res, next) {
  Article.findByIdAndUpdate({slug: req.params.slug},{$pull :{comments:req.params._id}},(err,data)=>{
    console.log({_id: req.params.id},"+++++++++++++++++++++++++")
    if(err) res.send('deleted not success')
    else res.json('comment delete success')
  })
})

// router.delete('/articles/:slug/comments/:id',  validToken, function(req, res, next) {
//   Article.findOneAndDelete( req.params.id,(err,data)=>{
//     console.log({_id: req.params.id},"+++++++++++++++++++++++++")
//     if(err) res.send('deleted not success')
//     else res.json('comment delete success')
//   })
// })

module.exports = router;
