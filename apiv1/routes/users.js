var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');

// User.find({},(err,data)=>{
//   if(err) console.log(err);
//   console.log(data)
// })
/* GET users listing. */
router.post('/', function(req, res) {
  // console.log(req.body)
 var newUser = new User (req.body);
  newUser.save((err)=> {
    // console.log('hlo')
    if(err) res.send(err)
   if(!err)res.send('file save')
  })
});

router.get('/', (req, res) => {
  //List all user by using User.find
  User.find({},(err,data)=>{
    // console.log(data)
    if(err) res.send(err)
    res.json({users:data})
  })
});

router.get('/:id', (req, res) => {
  // Using id get data from database(User) and send it in response using res.json(user) 
  User.findById(req.params.id,(err,data)=>{
    if(err) res.send(err)
    // console.log(data)
    res.json(data)
  })
});

router.put('/:id/edit', (req, res) => {
  // Find the user using id(req.params.id) and update it using findByIdAndUpdate
  // send updated data using res.json
  User.findById(req.body,(err, res)=> {
    if(err) res.send(err);
  })
});

router.post('/:id/edit',(req,res)=> {
  User.findByIdAndUpdate(req.params.id,req.body,{new :true},(err,data)=>{
    if(err)res.send(err);
    res.send(data)
  })
})

router.get('/:id/delete',(req, res) => {
  User.findByIdAndDelete(req.params.id,(err,data) => {
    if(err) res.send(err)
    res.send(data)
  })
})

router.delete('/:id', (req, res) => {
// Delete user using id()
});

module.exports = router;
