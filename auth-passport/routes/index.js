var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session,"session")
  res.render('index', { title: 'Express' });
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
