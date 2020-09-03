var mongoose = require('mongoose');

var schema = mongoose.Schema;

var parentSchema = new schema ({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
});

var parent = mongoose.model('Parent', parentSchema);

module.exports = parent;