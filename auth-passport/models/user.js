var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema ({
  username : {type:String, required:true},
  email : {type:String, required: true},
  password : {type:String, required: true}
})

userSchema.pre("save",function(next){
  var user = this;
  bcrypt.hash(user.password, 10, (err,data) => {
    user.password = data;
    next();
  });
});


var User = mongoose.model('User', userSchema)
module.exports = User;