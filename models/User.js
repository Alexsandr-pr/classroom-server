

const {Schema, model} = require("mongoose");

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    taskList: {type: Array, required: false},
    groupList: {type: Array, required: false},
})

module.exports = model("User", User);
