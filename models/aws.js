const mongoose = require('mongoose');

var awsSchema = new mongoose.Schema({
    name: {
        type:String
    },
    accessKey: {
        type:String,
        required: true
    },
    secretAccessKey : {
        type:String,
        required: true
    },
    sesRegion : {
        type:String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

var aws = mongoose.model("aws",awsSchema,"aws");

module.exports = {aws};