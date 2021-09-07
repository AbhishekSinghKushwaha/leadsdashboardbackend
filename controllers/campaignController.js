const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { campaign } = require('../models/campaign');
var auth = require('../middleware/auth.js');


/////////// GET ///////////
router.get('/', (req,res)=>{
    campaign.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});


///////////GETBYID///////////////
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    campaign.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// POST ///////////////
router.post('/', (req, res) => {
    const post = req.body;

    const campaigns = new campaign({...post, creator: req.userId, createdAt: new Date().toISOString()}) 
    campaigns.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in leads Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


/////////// FILTER //////////////
router.post('/filtercampaign', async(req, res) => {
    const {fcampaign} = req.body;

    var rcampaign = new RegExp(fcampaign, 'i');

    await campaign.find()
    .and([{'campaignTitle': { $regex: rcampaign }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });

});

/////////// PUT ////////////////
router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var campaigns = {
        campaignTitle : req.body.campaignTitle,
        audience : req.body.audience,
        segment : req.body.segment,
        subject : req.body.subject,
        preheaderText : req.body.preheaderText,
        senderName : req.body.senderName,
        senderEmail : req.body.senderEmail,
        replyEmail : req.body.replyEmail,
        content : req.body.content,
        delivery: req.body.delivery,
        deliveryDate : req.body.deliveryDate,
        hours : req.body.hours,
        minutes: req.body.minutes,
        ampm : req.body.ampm,
        timeZone : req.body.timeZone,
    };   
    campaign.findByIdAndUpdate(req.params.id,{$set:campaigns},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in leads update:'+JSON.stringify(err, undefined, 2));}
    });
});

//////////// DELETE ///////////
router.delete('/:id', (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
        campaign.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;