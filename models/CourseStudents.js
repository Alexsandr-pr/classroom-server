const {Schema, model} = require("mongoose");

const CourseStudentsSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true }
});

module.exports = model('CourseStudents', CourseStudentsSchema);