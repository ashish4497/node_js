var mongoose = require("mongoose");
var Schema = mongoose.Schema;


let userSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 75 },
  email: { type: String, required: true, maxlength: 50 },
  description: { type:String, required: true },
  contactNo: { type: Number, required: true}
});

var User = mongoose.model('User',userSchema);
module.exports = User;
