var Promise = require('bluebird');
var BaseModel = require('./BaseModel');

class TransactionModel extends BaseModel{}

TransactionModel.prototype.createTransaction = (body)=>{
    var data = {};
    if(body){
        if(body.studentId){
            data.studentId = body.studentId;
        }
        if(body.amount){
            data.amount = body.amount;
        }
        if(body.time){
            data.time = body.time;
        }
    }
    var model = require('../Database/transaction.db');
    var newTransaction = model(body);
    return Promise.resolve(newTransaction.save());

};

TransactionModel.prototype.getTransactions = (opts)=>{
   var model = require('../Database/transaction.db');
   console.log("asdfasdfsadfasdf");
   var query = {};
   var options = {
       'sort': {
           'time': 1
       }
   };
   if(opts) {
        if(opts._id) {
            query._id = opts._id;
        }
        if(opts.studentId) {
            query.studentId = opts.studentId;
        }
        if(opts.amount) {
            query.amount = opts.amount;
        }
        if(opts.time) {
            query.time = opts.time;
        }
    }
    return Promise.resolve(model.find(query,{},options)).then(function(res) {
        return res;
    });
};

module.exports = {
    getInst :()=>{
        return new TransactionModel();
    }
}
