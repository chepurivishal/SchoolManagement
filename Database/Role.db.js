var mongoose = require('mongoose');

var schema = mongoose.Schema;

var roleSchema = new schema ({
    type: {
        type: String,
        required: true,
        enum : ["Parent","Admin"]
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type : String,
        required : true
    }
});

var role = mongoose.model('Role', roleSchema);

module.exports = role;