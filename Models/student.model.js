var Promise = require('bluebird');
var BaseModel = require('./BaseModel');

class StudentModel extends BaseModel{}

StudentModel.prototype.createStudent = (body)=>{
    var data = {};
    if(body){
        if(body.name){
            data.name = body.name;
        }
        if(body.dob){
            data.dob = body.dob;
        }
        if(body.academicYear){
            data.academicYear = body.academicYear;
        }
        if(body.class){
            data.class = body.class;
        }
        if(body.parent){
            data.parent = body.parent;
        }
        if(body.feeNeedTobePaid){
            data.feeNeedTobePaid = body.feeNeedTobePaid;
        }
        
    }
    var model = require('../Database/Student.db');
    var newStudent = model(body);
    return Promise.resolve(newStudent.save());

};
StudentModel.prototype.getStudents = (opts)=>{
   var model = require('../Database/Student.db');
   var query = {};
   var options = {};
   if(opts) {
    if(opts._id) {
        query._id = opts._id;
    }
    if(opts.name) {
        query.name = opts.name;
    }
    if(opts.dob) {
        query.dob = opts.dob;
    }
    if(opts.academicYear) {
        query.academicYear = opts.academicYear;
    }
    if(opts.class) {
        query.class = opts.class;
    }
    if(opts.parent) {
        query.parent = opts.parent;
    }
    if(opts.feeNeedTobePaid) {
        query.feeNeedTobePaid = opts.feeNeedTobePaid;
    }
}
return Promise.resolve(model.find(query,{},options));
};
StudentModel.prototype.getStudent = (id)=>{
    var model = require('../Database/Student.db');
    var query = {};
    if(id){
        query._id = id;
    }
    return Promise.resolve(model.findOne(query)).then(function(data) {
        if(data) {
            return data.toObject(data);
        }
    }).then(function(data) {
        return data;
    });

};
StudentModel.prototype.updateStudent = (opts,body)=>{
    var model = require('../Database/Student.db');
    var query = {};
    if(opts) {
        if(opts.id) {
            query._id = opts.id;
        }
        if(opts.name) {
            query.name = opts.name;
        }
        if(opts.dob) {
            query.dob = opts.dob;
        }
        if(opts.academicYear) {
            query.academicYear = opts.academicYear;
        }
        if(opts.class) {
            query.class = opts.class;
        }
        if(opts.parent) {
            query.parent = opts.parent;
        }
        if(opts.feeNeedTobePaid) {
            query.feeNeedTobePaid = opts.feeNeedTobePaid;
        }
    }
    return Promise.resolve(model.findOneAndUpdate(query, body));

};
StudentModel.prototype.deleteStudent = (id)=>{
    var model = require("../Database/Student.db");
    var query = {};
    if(id){
        query._id = id 
    }
    return Promise.resolve(model.findByIdAndRemove(query));
};
StudentModel.prototype.getStudentsMeta = ()=>{
    const model = require('../Database/Student.db');
    let  query = {};
    const projection = {
        name : 1,
        mobile: 1,
        email : 1
    };
    return Promise.resolve(model.find(query,projection))
};

module.exports = {
    getInst :()=>{
        return new StudentModel();
    }
}
