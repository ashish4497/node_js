var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema ({
  username : {type:String},
  email : {type:String},
  password : {type:String},
  number : Number
})

userSchema.pre("save",function(next){
  var user = this;
  if(this.password){
    bcrypt.hash(user.password, 10, (err,data) => {
      user.password = data;
      next();
    });
  } else {
    next()
  }
});


var User = mongoose.model('User', userSchema)
module.exports = User;