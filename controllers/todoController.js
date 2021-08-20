const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { todo } = require('../models/todo');
var auth = require('../middleware/auth.js');


/////////// GET ///////////
router.get('/', (req,res)=>{
    todo.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});

///////////GETBYID///////////////
router.get('/:id', auth, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    todo.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// FILTER //////////////
router.post('/filtertask', async(req, res) => {
    const {ftask, ftasktype, isCompletedtrue, isfalse} = req.body;
    console.log(req.body);

    var rtask = new RegExp(ftask, 'i');

    if(ftasktype === ''){
        await todo.find()
        .or([{'title': { $regex: rtask }}, {'task': { $regex: rtask }}])
        .exec((err,docs) => { 
            if (!err) { 
                res.send(docs);
                }	
            else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
        });
    }
    else
    if(ftasktype === "Completed"){
        await todo.find()
        .or([{'title': { $regex: rtask }}, {'task': { $regex: rtask }}])
        .and([{'isCompleted': isCompletedtrue}])
        .exec((err,docs) => { 
            if (!err) { 
                res.send(docs);
                }	
            else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
        });
    }
    else
    if(ftasktype === "Pending"){
        await todo.find()
        .or([{'title': { $regex: rtask }}, {'task': { $regex: rtask }}])
        .and([{'isCompleted': isfalse}])
        .exec((err,docs) => { 
            if (!err) { 
                res.send(docs);
                }	
            else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
        });
    }   

});

/////////// POST ///////////////
router.post('/', auth, (req, res) => {
    var todotask = new todo({
        title : req.body.title,
        task : req.body.task,
        priority : req.body.priority,
        taskdate : req.body.taskdate,
        isCompleted : req.body.isCompleted
    }); 
    todotask.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in todo Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// PUT ////////////////
router.put('/:id', auth, (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var todotask = {
        // title : req.body.title,
        // task : req.body.task,
        // priority : req.body.priority,
        // taskdate : req.body.taskdate,
        isCompleted : req.body.isCompleted
    };    
    todo.findByIdAndUpdate(req.params.id,{$set:todotask},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in todo update:'+JSON.stringify(err, undefined, 2));}
    });
});

//////////// DELETE ///////////
router.delete('/:id', auth, (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
    todo.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;