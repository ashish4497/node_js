var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var blog = mongoose.model('blog');
var comments = mongoose.model('Comment');
var moment =require('moment');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  if(req.session.userId){
    User.findById(req.session.userId, (err, user) => {
      if(err) return res.status(400).send(err);
      req.user = user;
      res.locals.user = user;
    })
    next();
    return;
  }
  res.redirect('/login')
});

//login 
router.get('/login', function(req,res){
  // console.log(req.session,"data in session")
  res.render('login')
})

router.post('/login',function(req,res){
  var {email, password} = req.body;
  User.findOne({email:email},(err,user)=>{
    console.log(err,user)
    if(err) res.send(err);
    if(!user) res.send('not match');
    if(!bcrypt.compareSync(password,user.password)){
      res.send('wrong password')
    };
    req.session.userId = user._id;
    res.redirect('/') 
  })
})
// user User */

router.get('/register',function (req,res){
  res.render('signUp')
  res.redirect('')
})

router.post('/register', function(req, res){
  var newSignUp = new User(req.body);
  newSignUp.save((err,User)=>{
    if(err) res.send(err);
    // User.find
    res.redirect('/register')
  })
})

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

router.get('/', function(req, res){
  blog.find({}, (err, data) => {
    if(err) console.log(err);
    res.render('header', {blogs: data,moment:moment} );
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

router.get('/blog/:id/edit', function(req,res) {
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
});

var isUser = (req,res,next) => {
  if(req.session.userId){
    req.user = user;
    res.locals.user = user;
    next()
  }
  res.redirect('/login')
}

module.exports = router;
