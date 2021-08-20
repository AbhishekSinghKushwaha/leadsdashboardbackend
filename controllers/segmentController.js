const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { segments } = require('../models/segment');
var auth = require('../middleware/auth.js');


/////////// GET ///////////
router.get('/', (req, res)=>{
    segments.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

/////////// FILTER //////////////
router.post('/filtersegment', async(req, res) => {
    const {fsegment} = req.body;
    console.log(req.body);

    var rsegment = new RegExp(fsegment, 'i');

    await segments.find()
    .and([{'segmentName': { $regex: rsegment }}])
    .exec((err,docs) => { 
        if (!err) { 
            res.send(docs);
            console.log(docs)
            }	
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });

});

///////////GETBYID///////////////
router.get('/:id', auth, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    segments.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// POST ///////////////
router.post('/', auth, (req, res) => {
    const post = req.body;
    console.log(post)
    const segment = new segments({...post, creator: req.userId, createdAt: new Date().toISOString()})
    segment.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in segments Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// PUT ////////////////
router.put('/:id', auth, (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var segment = {
        segmentName : req.body.segmentName,
        subscribers : req.body.subscribers,
        segmentDetails : req.body.segmentDetails
    };   
    segments.findByIdAndUpdate(req.params.id,{$set:segment},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in segments update:'+JSON.stringify(err, undefined, 2));}
    });
});

//////////// DELETE ///////////
router.delete('/:id', auth, (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
    segments.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;