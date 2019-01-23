var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy( {
  usernameField : 'email'
},
  function(email, password, done) {

    console.log('inside passport user find')
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compare(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = passport;


