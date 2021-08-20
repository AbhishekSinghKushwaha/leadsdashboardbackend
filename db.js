var mongoose = require("mongoose");

// Connect to database (It will search for the leadsdashboard database if it is not present then it will create a new one)
mongoose.connect("mongodb://localhost/leadsdashboard", {useUnifiedTopology: true, useNewUrlParser: true},(err)=>{
    if(!err)
    {console.log("Successfully Connected to MongoDB")}
    else
    {console.log("Error in DB Connection...")}
});


module.exports = mongoose;