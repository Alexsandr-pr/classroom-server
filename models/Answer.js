const {Schema, model} = require("mongoose");

const AnswerSchema = new Schema({
    text: { type: String, required: true },
    task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Answer', AnswerSchema);
