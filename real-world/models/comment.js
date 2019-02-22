var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let commentSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  content :String,
  author : [{type:Schema.Types.ObjectId, ref:'User'}]
})
var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;
