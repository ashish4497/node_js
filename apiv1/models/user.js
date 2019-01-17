var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let  userSchema = new Schema({
  userName: String,
  description:String,
  contactNo: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;