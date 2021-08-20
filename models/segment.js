const mongoose = require('mongoose');

var segmentSchema = new mongoose.Schema({
    segmentName: {
        type:String,
        required: true
    },
    subscribers : {
        type:String,
        required: true
    },
    segmentDetails: [{
        activityType : {
            type:String
        },             
        campaignValue : {
            type:String
        },
        campaignMatch : {
            type:String
        },
        campaigns : [{
            type:String
        }],
        ecommerceValue : {
            type:String
        },             
        ecommerceMatch : {
            type:String
        },
        ecommerce : [{
            type:String
        }],
        tagsMatch : {
            type:String
        },
        tags : [{
            type:String
        }],        
        segmentsMatch : {
            type:String
        },
        segments : [{
            type:String
        }],      
        dateValue : {
            type:String
        },
        isAfter : {
            type:Date
        },             
        isBefore : {
            type:Date
        },
        isWithinStart : {
            type:Date
        },
        isWithinEnd : {
            type:Date
        },
        isNotWithinStart : {
            type:Date
        },
        isNotWithinEnd : {
            type:Date
        },
    }],
    createdAt: {
        type:Date,
        default: Date.now
    }
});

var segments = mongoose.model("segments",segmentSchema,"segments");

module.exports = {segments};