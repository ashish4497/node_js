var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title : {type:String },
  description : {type:String},
  // likes : {type:Number},
  tag:[String],
  date:{type: Date, default: Date.now()},
  comments:[{type:Schema.Types.ObjectId, ref:'Comment'}]
}) 

var blog = mongoose.model('blog',blogSchema);
module.exports = blog;
