var app = require('../app');
var BaseService = require('./baseservice');

class ParentService extends BaseService{}

ParentService.prototype.addParent = (body)=>{
 var parentModel = require('../Models/parent.model').getInst();
 var roleModel = require("../Models/role.model").getInst();
 if(body) {
     var roleData = {
         type: "Parent",
         username: body.email,
         password: `${body.email.split("@")[0]}${parseInt(body.mobile / 100000)}`
        };
        console.log("1111111111111111111111            ", roleData);
    return roleModel.createRole(roleData).then(function(data) {
        console.log("DATA!!!!!!!!!!!              ", JSON.stringify(data));
        body.role = data._id;
        return parentModel.createParent(body);
    });
}
};
ParentService.prototype.getParents = (opts)=>{
    var parentModel = require('../Models/parent.model').getInst();
    if(opts){
        return parentModel.getParents(opts);
    }
};
ParentService.prototype.getParent = (id)=>{
    var parentModel = require('../Models/parent.model').getInst();
    var roleModel = require('../Models/role.model').getInst();
    if(id){
        return parentModel.getParent(id).then(function(parent) {
            console.log("!!!!!!!!!!             ", parent);
            return roleModel.getRole({_id: parent.role}).then(function(roleData) {
                parent.role = roleData[0];
                return Promise.resolve(parent);
            });
        });
    }
};
ParentService.prototype.updateParent = (opts,body)=>{
    var parentModel = require('../Models/parent.model').getInst();
    if(opts,body){
        return parentModel.updateParent(opts, body);
    }

};
ParentService.prototype.deleteParent = (id)=>{
    var parentModel = require('../Models/parent.model').getInst();
    if(id){
        return parentModel.deleteParent(id);
    } 
};
ParentService.prototype.getParentsMeta = () =>{
    var parentModel = require('../Models/parent.model').getInst();
    return parentModel.getParentsMeta();
};



module.exports = {
    getInst : ()=>{
        return new ParentService();
    }
}