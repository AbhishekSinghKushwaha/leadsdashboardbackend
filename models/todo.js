const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    task: {
        type:String,
        required: true
    },
    priority: {
        type:String,
        required: true
    },
    taskdate : {
        type:Date,
        default: Date.now
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean
    }
});

var todo = mongoose.model("todo", todoSchema);

module.exports = {todo};