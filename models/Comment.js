const {Schema, model} = require("mongoose");

const CommentSchema = new Schema({
    text: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true }
});

module.exports =  model('Comment', CommentSchema);