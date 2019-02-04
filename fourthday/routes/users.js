	var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');

//post method
router.post('/',(req,res) => {
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    if(err) res.status(400).send(err);
    res.render('/');
  });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},(err,data)=>{
    if(err) res.send(err);
    // console.log(data)
    res.render('template',{value:data})
  })
});

router.get('/:id', function (req, res, next){
  User.findOne({_id:req.params.id},(err, data)=>{
    // console.log(data)
    if(err) res.send(err)
    res.render('detail',{value:data})
  })
})

router.get('/:id/remove',function(req, res, next){
  User.deleteOne({_id:req.params.id},(err) => {
    if(err) res.send(err);
    res.redirect('/users')
  })
});

router.get('/:id/edit', function(req, res){
  User.findById({_id:req.params.id},(err,data) => {
    if(err) res.send(err);
    res.render('update',{val:data})
    // res.redirect('/users');
  });
});


router.post('/:id/edit',function(req, res){
  // console.log(req.body)
  const { id } = req.params;
  const {name, age, email, description, contactNo} = req.body;
  const updatesValues = {
    name,
    age,
    email,
    description,
    contactNo 
  }
  User.findOne({_id : id},(err,data)=>{
    console.log(data)
    data.name = name;
    data.age = age;
    data.email = email;
    data.save();
    res.redirect('/users')
  })

})

module.exports = router;
