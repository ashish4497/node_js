var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let commentSchema = new Schema({
  title:String,
  post:{type:Schema.Types.ObjectId, ref:'blog'},
  content :String,
  created :{type: Date, default: Date.now()},
  author :{type:Schema.Types.ObjectId, ref:'user'}
});

var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;