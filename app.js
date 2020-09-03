var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require('cors');
var connectDB = require('./connection');
var path = require ('path');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200     
}
app.use(cors(corsOptions));
var Port = process.env.PORT || 8080;

if(process.env.NODE_ENV === "production"){
  app.use(express.static('frontend/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,"frontend","build","index.html"));
  });
};

connectDB();
var classAppListener = require("./RESTAPI/classes.rest");
var parentAppListener = require("./RESTAPI/parent.rest");
var studentAppListener = require("./RESTAPI/student.rest");
var roleAppListener = require("./RESTAPI/role.rest");
var transactionListener = require("./RESTAPI/transaction.rest");
var middleware = require("./middleware.js");


middleware(app);
classAppListener(app);
parentAppListener(app);
studentAppListener(app);
roleAppListener(app);
transactionListener(app);

app.listen(Port);