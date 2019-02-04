var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var jwt = require('jsonwebtoken');


var token = jwt.sign({ foo: 'bar' }, 'shhhhh')

// //no 
// router.get('/read/:num1/:num2', function(req, res){
//   var num1 = Number(req.params.num1); 
//   var num2 = Number(req.params.num2);
//   var random;

//   if(num1>num2){
//     random = (Math.random()*(num1-num2))+num2;  
//   }
//   if(num1<num2){
//     random = (Math.random()*(num2- num1))+num1;
//   }
//   res.json({random})
// })


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session,"session")
  // res.render('index', { title: 'Express' });
  res.json({token})
});

//generate token
router.get('/a', function(req, res, next) {
  console.log(req.headers,"header")
  res.render('index', { title: 'Express' });
  jwt.verify(req.headers.token, "shhhhh", function(err, decoded) {
    console.log(decoded) // bar
  });
  // res.json({token})
});

// get request to register
router.get('/register', function(req, res, next) {
  res.render('signUp', { title: 'Express' });
});

// post request to register
router.post('/register', function(req, res, next) {
  var newUser = new User(req.body);
  newUser.save((err, data) => {
    if(err)res.send(err); 
    res.redirect('/login');
    console.log(data, "data store in mongo")
  })
});
// post request to register
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'welcome to login' });
  // res.redirect('/login')
});
// post request to register

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
    })
);

// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

//passport login setup
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {  
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//logout
  router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render('logout')
  })
module.exports = router;
