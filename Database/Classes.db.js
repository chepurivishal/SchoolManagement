var mongoose = require('mongoose');

var schema = mongoose.Schema;

var classesSchema = new schema ({
    class: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    academicYear: {
        type : Number,
        required : true
    },
    fee: {
        type: Number,
        required: true
    }
});

var classes = mongoose.model('Classes', classesSchema);

module.exports = classes;