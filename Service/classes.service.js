var app = require('../app');
var BaseService = require('./baseService');

class ClassService extends BaseService{}

ClassService.prototype.addClass = (body)=>{
 var classModel = require('../Models/classes.model').getInst();
 if(body) {
    return classModel.createClass(body);
}
};
ClassService.prototype.getClasses = (opts)=>{
    var classModel = require('../Models/classes.model').getInst();
    if(opts){
        return classModel.getClasses(opts);
    }
};
ClassService.prototype.getClass = (id)=>{
    var classModel = require('../Models/classes.model').getInst();
    if(id){
        return classModel.getClass(id);
    }
};
ClassService.prototype.updateClass = (opts,body)=>{
    var classModel = require('../Models/classes.model').getInst();
    if(opts,body){
        return classModel.updateClass(opts, body);
    }

};
ClassService.prototype.deleteClass = (id)=>{
    var classModel = require('../Models/classes.model').getInst();
    if(id){
        return classModel.deleteClass(id);
    } 
};
ClassService.prototype.getClassesMeta = () =>{
    var classModel = require('../Models/classes.model').getInst();
    return classModel.getClassesMeta();
};

module.exports = {
    getInst : ()=>{
        return new ClassService();
    }
}