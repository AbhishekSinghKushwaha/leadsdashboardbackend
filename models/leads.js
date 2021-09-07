const mongoose = require('mongoose');

var leadsSchema = new mongoose.Schema({
    name: {
        type:String
    },
    companyname : {
        type:String,
        required: true
    },
    url : {
        type:String,
        required: true
    },
    technology :[{
        type:String,
        required: true
    }],
    location : {
        type:String,
        required: true
    },
    source : {
        type:String,
        required: true
    },
    type : {
        type:String,
        required: true
    },
    noofpositions : {
        type:String,
    },
    experience : {
        type:String,
    },
    sourceurl : {
        type:String,
        required: true
    },
    userdetails: [{
        contactname : {
            type:String,
            required: true
        },             
        emailaddress : {
            type:String,
            required: true
        },
        phone : {
            type:String,
            required: true
        },
        designation : {
            type:String,
            required: true
        },
    }],
    lastreply : {
        type:String,
        required: true
    },
    status : {
        type:String,
        required: true
    },
    whentoconnect : {
        type:String,
    },
    comments : {
        type:String,
        required: true
    },
    lastfollowup : {
        type:Date,
        default: Date.now
    },
    estimates : {
        type:String,
        required: true
    },
    projectDuration : {
        type:String,
        required: true
    },
    timeZone : {
        type:String,
        required: true
    },
    tags : [{
        type:String
    }],
    subscribed : {
        type:String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

var leads = mongoose.model("leads",leadsSchema);

module.exports = {leads};