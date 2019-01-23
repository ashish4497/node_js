var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

User.find({},(err,data)=> {
  if(err) console.log(err)
})

module.exports = router;
