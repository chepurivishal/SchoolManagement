var mongoose = require('mongoose');

var schema = mongoose.Schema;

var transactionSchema = new schema ({
    studentId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    time: {
        type : Number,
        required : true,
        default: Date.now()
    }
});

var transactions = mongoose.model('Transactions ', transactionSchema);

module.exports = transactions;