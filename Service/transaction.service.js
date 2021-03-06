var app = require('../app');
var Promise = require("bluebird");
var BaseService = require('./baseservice');
var _ = require('lodash');

class TransactionService extends BaseService { }

TransactionService.prototype.addTransaction = (body) => {
    var transactionModel = require('../Models/transaction.model').getInst();
    if(body) {
        return transactionModel.createTransaction(body);
    }
};

TransactionService.prototype.getTransactions = (opts) => {
    var transactionModel = require('../Models/transaction.model').getInst();
    if(opts) {
        return transactionModel.getTransactions(opts).then(function(transactions) {
            return Promise.map(transactions, function(transaction) {
                transaction = transaction.toObject(transaction);
                return resolvetransaction(transaction);
            });
        }).then(function(res) {
            return _.compact(res);
        });
    }
};


const resolvetransaction = (data) => {
    var studentModel = require('../Models/student.model').getInst();

    if (data) {
        var studentId = data.studentId;

        var getStudentP = studentModel.getStudent(studentId);
        return Promise.join(getStudentP).spread(function (student) {
            if(student) {
                student = _.omit(student, ["__v"]);
                data = _.omit(data, ["studentId", "__v"]);
                data.student = student;
                return Promise.resolve(data);
            }
        });

    }
}

module.exports = {
    getInst: () => {
        return new TransactionService();
    }
};