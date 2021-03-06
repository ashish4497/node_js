var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt =require('bcrypt')

var userSchema = new Schema({
  username:{type: String,required:true},
  email:{type:String, required:true},
  password: {type:String, default: ''},
  github: { 
    username: String, photo: String
  }
})

userSchema.pre("save",function(next){
  console.log(this.password)
  this.password =bcrypt.hashSync(this.password,10);
  next();
});

var User = mongoose.model('User',userSchema);
module.exports = User;