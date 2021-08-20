const mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
    name: {
        type:String
    },
    campaignTitle: {
        type:String,
        required: true
    },
    audience : {
        type:String,
        required: true
    },
    segment: {
        type:String
    },
    subject : {
        type:String,
        required: true
    },
    preheaderText: {
        type:String
    },
    senderName : {
        type:String,
        required: true
    },
    senderEmail: {
        type:String,
        required: true
    },
    replyEmail : {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    delivery : {
        type:String,
        required: true
    },
    deliveryDate: {
        type:Date,
        default: Date.now
    },
    hours:{
        type:Number,
    },
    minutes:{
        type:Number,
    },
    ampm:{
        type:String,
    },
    timeZone: {
        type:String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

var campaign = mongoose.model("campaign",campaignSchema,"campaign");

module.exports = {campaign};