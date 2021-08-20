const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var leadsController = require('./controllers/leadsController');
var userController = require('./controllers/userController');
var todoController = require('./controllers/todoController');
var campaignController = require('./controllers/campaignController');
var segmentController = require('./controllers/segmentController');
var tagsController = require('./controllers/tagsController');
var awsController = require('./controllers/awsController');

var app = express();

app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());

app.use(cors({origin:'http://localhost:3000'}));

app.listen(5000, () => console.log('Server started at port : 5000'));

app.use('/leadsdashboard',leadsController);
app.use('/user',userController);
app.use('/todo', todoController);
app.use('/campaign', campaignController);
app.use('/segment', segmentController);
app.use('/tag', tagsController);
app.use('/aws', awsController);