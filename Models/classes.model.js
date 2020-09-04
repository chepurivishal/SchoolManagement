var Promise = require('bluebird');
var BaseModel = require('./BaseModel');

class ClassModel extends BaseModel{}

ClassModel.prototype.createClass = (body)=>{
    var data = {};
    if(body){
        if(body.class){
            data.class = body.class;
        }
        if(body.section){
            data.section = body.section
        }
        if(body.academicYear){
            data.academicYear = body.academicYear
        }
    }
    var model = require('../Database/Classes.db');
    var newClass = model(body);
    return Promise.resolve(newClass.save());

};
ClassModel.prototype.getClasses = (opts)=>{
   var model = require('../Database/Classes.db');
   var query = {};
   var options = {};
   if(opts) {
    if(opts._id) {
        query._id = opts._id;
    }
    if(opts.class) {
        query.class = opts.class;
    }
    if(opts.section) {
        query.section = opts.section;
    }
    if(opts.academicYear) {
        query.academicYear = opts.academicYear;
    }
    if(opts.fee) {
        query.fee = opts.fee;
    }
}
return Promise.resolve(model.find(query,{},options));
};
ClassModel.prototype.getClass = (id)=>{
    var model = require('../Database/Classes.db');
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
ClassModel.prototype.updateClass = (opts,body)=>{
    var model = require('../Database/Classes.db');
    var query = {};
    if(opts) {
        if(opts.id) {
            query._id = opts.id;
        }
        if(opts.class) {
            query.class = opts.class;
        }
        if(opts.section) {
            query.section = opts.section;
        }
        if(opts.academicYear) {
            query.academicYear = opts.academicYear;
        }
        if(opts.fee) {
            query.fee = opts.fee;
        }
    }
    return Promise.resolve(model.findOneAndUpdate(query, body));

};
ClassModel.prototype.deleteClass = (id)=>{
    var model = require("../Database/Classes.db");
    var query = {};
    if(id){
        query._id = id 
    }
    return Promise.resolve(model.findByIdAndRemove(query));
};
ClassModel.prototype.getClassesMeta = ()=>{
    const model = require('../Database/Classes.db');
    let  query = {};
    const projection = {
        class : 1,
        section: 1,
        academicYear : 1,
        fee : 1
    };
    return Promise.resolve(model.find(query,projection))
};

module.exports = {
    getInst :()=>{
        return new ClassModel();
    }
}
