const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { aws } = require('../models/aws');
var auth = require('../middleware/auth.js');
const async = require('async');


/////////// GET ///////////
router.get('/', (req,res)=>{
    aws.find((err,docs) => { 
        if (!err) { 
            res.send(docs);
            }
        else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
    });
});


//get user aws details
getAwsDetail = async (req, res) => {
    let name = req.params.name;
    console.log(name)
    let hiddenResponseVariables = {
        "__v": 0,
        "createdAt": 0
    }

    async.series([
        function (callback) {
            aws.findOne({
                name,
            }, hiddenResponseVariables, callback)
        }
    ],
    function (err, awsData) {
        res.status(200).type('json').send(JSON.stringify({
            awsData,
        }, null, 2));
        if (err) {
            res.status(200).type('json').send(JSON.stringify({
                err
            }, null, 2));
        }
    });
}
router.get('/awsuser/:name', (req,res)=>{ 
    getAwsDetail(req, res)
})

///////////GETBYID///////////////
router.get('/:id', auth, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    aws.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving details :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// POST ///////////////
router.post('/', auth, (req, res) => {
    const post = req.body;
    console.log(post)
    const awsDetails = new aws({...post, creator: req.userId, createdAt: new Date().toISOString()})

    awsDetails.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            res.status(500).send({message:err.message,success:false});
            console.log('Error in aws Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

/////////// PUT ////////////////
router.put('/:id', auth, (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
        
    var awsDetails = {
        accessKey : req.body.accessKey,
        secretAccessKey : req.body.secretAccessKey,
        sesRegion : req.body.sesRegion,
    };   
    aws.findByIdAndUpdate(req.params.id,{$set:awsDetails},{new:true}, (err,doc)=>{
        if(!err) {res.send(doc);}
        else {console.log('Error in aws update:'+JSON.stringify(err, undefined, 2));}
    });
});

//////////// DELETE ///////////
router.delete('/:id', auth, (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id:${req.params.id}`);
    
    aws.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in signup delete:'+JSON.stringify(err, undefined, 2));}
    });
});

// /////////// FILTER //////////////
// router.post('/filteraws', async(req, res) => {
//     const {faws} = req.body;
//     console.log(req.body);

//     var raws = new RegExp(ftag, 'i');

//     await aws.find()
//     .and([{'tagName': { $regex: raws }}])
//     .exec((err,docs) => { 
//         if (!err) { 
//             res.send(docs);
//             console.log(docs)
//             }	
//         else { console.log('Error in retriving data:'+JSON.stringify(err,undefined,2))};
//     });


// });

module.exports = router;