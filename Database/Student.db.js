var mongoose = require('mongoose');

var schema = mongoose.Schema;

var studentSchema = new schema ({
    name: {
        type: String,
        required: true
    },
    dob : {
        type : String,
        required : true
    },
    academicYear: {
        type: Number,
        required: true
    },
    class: {
        type : String,
        required : true
    },
    parent : {
        type : String,
        required : true
    },
    feeNeedTobePaid: {
      type: Number, 
      required: true,
      default: 0  
    }
});

var student = mongoose.model('Student', studentSchema);

module.exports = student    ;