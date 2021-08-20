const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { tags } = require('../models/tags');
var auth = require('../middleware/auth.js');


/////////// GET ///////////
router.get('/', (req,res)=>{
    tags.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

/////////// FILTER //////////////
router.post('/filtertags', async(req, res) => {
    const {ftag} = req.body;
    console.log(req.body);

    var rtag = new RegExp(ftag, 'i');

    await tags.find()
    .and([{'tagName': { $regex: rtag }}])
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

    tags.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// POST ///////////////
router.post('/', auth, (req, res) => {
    const post = req.body;
    console.log(post)
    const tag = new tags({...post, creator: req.userId, createdAt: new Date().toISOString()})

    tag.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in tags Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// PUT ////////////////
router.put('/:id', auth, (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
        
    var tag = {
        tagName : req.body.tagName,
        tagDescription : req.body.tagDescription
    };   
    tags.findByIdAndUpdate(req.params.id,{$set:tag},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in tags update:'+JSON.stringify(err, undefined, 2));}
    });
});

//////////// DELETE ///////////
router.delete('/:id', auth, (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
    tags.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;