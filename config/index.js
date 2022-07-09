var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/userdb";

mongoose.connect(url,{useNewUrlParser:true},function(err,success){
    if(err)
        console.log("Database not connected")
    else
        console.log("Database connected successfully.")

})