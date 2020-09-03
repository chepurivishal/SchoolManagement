var Promise = require('bluebird');
var BaseModel = require('./BaseModel');

class ParentModel extends BaseModel{}

ParentModel.prototype.createParent = (body)=>{
    var data = {};
    if(body){
        if(body.name){
            data.name = body.name;
        }
        if(body.mobile){
            data.mobile = body.mobile
        }
        if(body.email){
            data.email = body.email
        }
        if(body.role){
            data.role = body.role
        }
        
    }
    var model = require('../Database/Parent.db');
    var newParent = model(body);
    return Promise.resolve(newParent.save());

};
ParentModel.prototype.getParents = (opts)=>{
   var model = require('../Database/Parent.db');
   var query = {};
   var options = {};
   if(opts) {
    if(opts._id) {
        query._id = opts._id;
    }
    if(opts.name) {
        query.name = opts.name;
    }
    if(opts.mobile) {
        query.mobile = opts.mobile;
    }
    if(opts.email) {
        query.email = opts.email;
    }
    if(opts.role) {
        query.role = opts.role;
    }
}
return Promise.resolve(model.find(query,{},options));
};
ParentModel.prototype.getParent = (id)=>{
    var model = require('../Database/Parent.db');
    var query = {};
    if(id){
        query._id = id;
    }
    return Promise.resolve(model.findOne(query)).then(function(data) {
        if(data) {
            return data.toObject(data);
        }
        else return Promise.reject();
    }).then(function(data) {
        return data;
    });

};
ParentModel.prototype.updateParent = (opts,body)=>{
    var model = require('../Database/Parent.db');
    var query = {};
    if(opts) {
        if(opts.id) {
            query._id = opts.id;
        }
        if(opts.name) {
            query.name = opts.name;
        }
        if(opts.mobile) {
            query.mobile = opts.mobile;
        }
        if(opts.email) {
            query.email = opts.email;
        }
        if(opts.role) {
            query.role = opts.role;
        }
    }
    return Promise.resolve(model.findOneAndUpdate(query, body));

};
ParentModel.prototype.deleteParent = (id)=>{
    var model = require("../Database/Parent.db");
    var query = {};
    if(id){
        query._id = id 
    }
    return Promise.resolve(model.findByIdAndRemove(query));
};
ParentModel.prototype.getParentsMeta = ()=>{
    const model = require('../Database/Parent.db');
    let  query = {};
    const projection = {
        name : 1,
        mobile: 1,
        email : 1,
        role : 1
    };
    return Promise.resolve(model.find(query,projection))
};

module.exports = {
    getInst :()=>{
        return new ParentModel();
    }
}
