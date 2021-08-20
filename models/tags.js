const mongoose = require('mongoose');

var tagsSchema = new mongoose.Schema({
    name: {
        type:String
    },
    tagName: {
        type:String,
        required: true
    },
    tagDescription : {
        type:String
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

var tags = mongoose.model("tags",tagsSchema,"tags");

module.exports = {tags};