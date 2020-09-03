var mongoose = require("mongoose");

var Url = "mongodb+srv://admin:admin@123@cluster0.0m68l.mongodb.net/<SchoolManagment>?retryWrites=true&w=majority";

var connectDB = async()=> {
    await mongoose.connect(Url,{useUnifiedTopology: true, useNewUrlParser : true} )
};

module.exports = connectDB;