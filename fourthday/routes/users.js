var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');

//post method
router.post('/',(req,res) => {
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    if(err) res.status(400).send(err);
    res.redirect('/');
  });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},(err,data)=>{
    if(err) res.send(err);
    console.log(data)
    res.render('template',{value:data})
  })

router.get('/:id', function (req, res, next){
  User.findOne({_id:req.params.id},(err, data)=>{
    // console.log(data)
    if(err) res.send(err)
    res.render('detail',{value:data})
  })
})

router.get('/remove',function(req, res, next){
  user.deleteOne({_id:req.params.id},(err, data) => {
    if(err) res.send(err)

  })
})

  // res.send('respond with a resource');
});

module.exports = router;
