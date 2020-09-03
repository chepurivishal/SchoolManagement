var Promise = require('bluebird');
var BaseModel = require('./BaseModel');

class RoleModel extends BaseModel{}

RoleModel.prototype.createRole = (body)=>{
    var data = {};
    if(body){
        if(body.type){
            data.type = body.type;
        }
        if(body.username){
            data.username = body.username;
        }
        if(body.password){
            data.password = body.password;
        }
    }
    var model = require('../Database/Role.db');
    var newRole = model(body);
    return Promise.resolve(newRole.save());

};
RoleModel.prototype.getRole = (opts)=>{
   var model = require('../Database/Role.db');
   var query = {};
   var options = {};
   if(opts) {
    if(opts._id) {
        query._id = opts._id;
    }
    if(opts.type) {
        query.type = opts.type;
    }
    if(opts.username) {
        query.username = opts.username;
    }
    if(opts.password) {
        query.password = opts.password;
    }
}
return Promise.resolve(model.find(query,{},options));
};

module.exports = {
    getInst :()=>{
        return new RoleModel();
    }
}
