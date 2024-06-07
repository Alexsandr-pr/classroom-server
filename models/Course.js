
const {Schema, model} = require("mongoose");


const CourseSchema = new Schema({
    name: { type: String, required: true },
    teacher_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Course', CourseSchema);