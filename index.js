const express = require('express');
const cors = require('cors');
var mongoose = require("mongoose");
var dotenv = require('dotenv');

var leadsController = require('./controllers/leadsController');
var userController = require('./controllers/userController');
var todoController = require('./controllers/todoController');
var campaignController = require('./controllers/campaignController');
var segmentController = require('./controllers/segmentController');
var tagsController = require('./controllers/tagsController');
var awsController = require('./controllers/awsController');

const app = express();
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({origin:'http://localhost:3000'}));

app.get('/', (req, res) => {
  res.send('Leads API')
})
app.use('/leadsdashboard',leadsController);
app.use('/user',userController);
app.use('/todo', todoController);
app.use('/campaign', campaignController);
app.use('/segment', segmentController);
app.use('/tag', tagsController);
app.use('/aws', awsController);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
