const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { leads } = require('../models/leads');
var auth = require('../middleware/auth.js');


/////////// GET ///////////
router.get('/', (req,res)=>{
    leads.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

/////////// FILTER //////////////
router.post('/filter', async(req, res) => {
    const {author, cname, curl, tech, stype} = req.body;

    var rauthor = new RegExp(author, 'i');
    var rcname = new RegExp(cname, 'i');
    var rcurl = new RegExp(curl, 'i');
    var rtech = new RegExp(tech, 'i');
    var rstype = new RegExp(stype, 'i');
    await leads.find()
    .and([{'name': { $regex: rauthor }}, {'companyname': { $regex: rcname }}, {'url':{$regex: rcurl}}, {'technology':{$regex: rtech}}, {'type':{$regex: rstype}}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });

});

/////////// FILTER TAGS//////////////
router.get('/tagsleads/:tagName', (req, res) => {
    const tagName = req.params.tagName;

    var rtagName = new RegExp(tagName, 'i');
    leads.find()
    .and([{'tags': { $regex: rtagName }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });

});


/////////// FILTER SEGMENT TAGS//////////////
// router.get('/segmenttags', (req, res) => {
//     const tagName = req.params.tagName;

//     var rtagName = new RegExp(tagName, 'i');
//     leads.find()
//     .and([{'tags': { $regex: rtagName }}])
//     .exec((err,docs) => { 
//         if (!err) { 
//             res.send(docs);
//             }	
//         else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
//     });

// });

///////////GETBYID///////////////
router.get('/:id', auth, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    leads.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// POST ///////////////
router.post('/', auth, (req, res) => {
    const post = req.body;
    const lead = new leads({...post, creator: req.userId, createdAt: new Date().toISOString()})
    // var lead = new leads({
    //     companyname : req.body.companyname,
    //     url : req.body.url,
    //     technology : req.body.technology,
    //     location : req.body.location,
    //     source : req.body.source,
    //     type : req.body.type,
    //     noofpositions : req.body.noofpositions,
    //     experience : req.body.experience,
    //     sourceurl : req.body.sourceurl,
    //     userdetails: req.body.userdetails,
    //     lastreply : req.body.lastreply,
    //     status : req.body.status,
    //     whentoconnect: req.body.whentoconnect,
    //     comments : req.body.comments,
    //     lastfollowup : req.body.lastfollowup
    // }); 
    lead.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in leads Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// PUT ////////////////
router.put('/:id', auth, (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var lead = {
        companyname : req.body.companyname,
        url : req.body.url,
        technology : req.body.technology,
        location : req.body.location,
        source : req.body.source,
        type : req.body.type,
        noofpositions : req.body.noofpositions,
        experience : req.body.experience,
        sourceurl : req.body.sourceurl,
        userdetails: req.body.userdetails,
        lastreply : req.body.lastreply,
        status : req.body.status,
        whentoconnect: req.body.whentoconnect,
        comments : req.body.comments,
        lastfollowup : req.body.lastfollowup,
        estimates : req.body.estimates,
        projectDuration : req.body.projectDuration,
        timeZone : req.body.timeZone,
        tags : req.body.tags,
        subscribed : req.body.subscribed
    };   
    leads.findByIdAndUpdate(req.params.id,{$set:lead},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in leads update:'+JSON.stringify(err, undefined, 2));}
    });
});

//////////// DELETE ///////////
router.delete('/:id', auth, (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
    leads.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;