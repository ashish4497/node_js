var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var blog = mongoose.model('blog')



/* GET home page. */
router.get('/blog', function(req, res, next) {
  res.render('fome');
  res.redirect("/");
});

router.post("/blog", function(req, res, next) {
  var newBlog = new blog(req.body);
  newBlog.save((err) => {
    if (err) console.log(err);
    // console.log(blog)
    res.redirect("/blog");
  });
  // console.log(newBlog);
});

router.get('/',function(req, res){
  blog.find({}, (err, data) => {
    if(err) console.log(err);
    // console.log(data)
    res.render('header', {blogs: data} );
    // console.log(value)
  });
 
})
router.get('/detail/:id', function(req, res) {
  blog.findById(req.params.id,(err, data)=>{
    if(err) console.log(err)
    console.log(data)
    res.render('detail',{detail:data})
  })
})
router.get('/blog/:id', function(req,res)  {
  blog.findOneAndDelete(req.params.id,(err,data)=> { 
  if(err) console.log(err)
  res.redirect('/')
  })
})

router.get('/edit/:id', function(req,res) {
  blog.findById(req.params.id,(err,data)=>{
    if(err) console.log(err)
    res.render('edit',{val:data})
    res.redirect('/')
  })
})

router.get('/edit/:id', function(req,res){
  blog.findByIdAndUpdate(req.params.id,(err,data)=>{
    if(err) console.log(err)
    
  })
})



module.exports = router;
