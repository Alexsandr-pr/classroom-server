const {Schema, model} = require("mongoose");


const TaskSchema = new Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    text: { type: String, required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    is_done: { type: Boolean, default: false }
});

module.exports = model('Task', TaskSchema);