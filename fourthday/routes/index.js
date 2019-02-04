var express = require('express');
var router = express.Router();
var path =require('path');
var baseDir = path.join(__dirname)
console.log(baseDir)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Form' });

});

module.exports = router;
