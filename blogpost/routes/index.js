var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var blog = mongoose.model('blog');
var comments = mongoose.model('Comment');

/* comment section */

router.post('/detail/:id/comments', function(req, res){
  var newComment = new comments(req.body);
  newComment.save((err, comment)=> {
    if(err) console.log(err)
    blog.findOneAndUpdate({_id: req.params.id},
      {$push: {comments: comment._id}},
      {new: true},
      (err,data) => {
      if(err) res.send(err)
      console.log(data,"comment section data")
    })
    res.redirect(`/detail/${req.params.id}`);
  })
})

// router.get('/detail/:id/comment',function(req, res){
//   comments.find({}, (err, data) => {
//     console.log(data,"get data")
//     if(err) res.send(err);
//     res.render('detail',{detail:data});
//   });
// });


/* GET home page. */
router.get('/blog', function(req, res, next) {
  res.render('fome');
  res.redirect("/blog");
});

router.post("/users/blog", function(req, res, next) {
  var newBlog = new blog(req.body);
  newBlog.save((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

router.get('/',function(req, res){
  blog.find({}, (err, data) => {
    if(err) console.log(err);
    res.render('header', {blogs: data} );
  });
 
})
router.get('/detail/:id', function(req, res) {
  blog.findOne({_id: req.params.id}).populate('comments').exec((err, post)=>{
    if(err) res.send(err)
    res.render('detail',{detail:post})
  });
});

router.get('/blog/:id', function(req,res)  {
  blog.findOneAndDelete(req.params.id,(err,data)=> { 
  if(err) console.log(err)
  res.redirect('/')
  })
})

router.get('/edit/:id/edit', function(req,res) {
  blog.findById(req.params.id,(err,data)=>{
    if(err) console.log(err)
    res.render('edit',{val:data})
    // res.redirect('/')
  })
})

router.post('/edit/:id', function(req,res){
  blog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,data)=>{
    if(err) console.log(err);
    res.redirect('/');
  })
})

module.exports = router;
