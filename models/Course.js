const {Schema, model, ObjectId} = require("mongoose");

const Course = new Schema({
    thema: {type: String, required: true},
    userId: {type:ObjectId, ref:"User", required:true}
})

module.exports = model("Course", Course);
