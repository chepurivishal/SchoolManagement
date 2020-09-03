var app = require('../app');
var Promise = require("bluebird");
var BaseService = require('./baseservice');
var _ = require('lodash');
const role = require('../Database/Role.db');

class StudentService extends BaseService { }

    StudentService.prototype.addStudent = (body) => {
    var studentModel = require('../Models/student.model').getInst();
    if(body) {
    return studentModel.createStudent(body);
}
};
    StudentService.prototype.getStudents = (opts) => {
    var studentModel = require('../Models/student.model').getInst();
    if(opts) {
    return studentModel.getStudents(opts).then(function(data){
        if(data){
            return Promise.map(data,function(student){
                student = student.toObject(student);
                return resolveStudent(student);
            })
        }
    });
}
};
    StudentService.prototype.getStudent = (id) => {
    var studentModel = require('../Models/student.model').getInst();
    if(id) {
    return studentModel.getStudent(id).then(function(data){
        return resolveStudent(data)
    });
}
};
    StudentService.prototype.updateStudent = (opts, body) => {
    var studentModel = require('../Models/student.model').getInst();
    if(opts, body) {
    return studentModel.updateStudent(opts, body);
}

};
    StudentService.prototype.deleteStudent = (id) => {
    var studentModel = require('../Models/student.model').getInst();
    if(id) {
    return studentModel.deleteStudent(id);
}
};
    StudentService.prototype.getStudentsMeta = () => {
    var studentModel = require('../Models/student.model').getInst();
    return studentModel.getStudentsMeta();
};

const resolveStudent = (data) => {
    var classModel = require('../Models/classes.model').getInst();
    var parentService = require('../Service/parent.service').getInst();

    if (data) {
        var classId = data.class;
        var parentId = data.parent;

        var getClassP = classModel.getClass(classId);
        var getParentP = parentService.getParent(parentId);
        return Promise.join(getClassP, getParentP).spread(function (_class, parent) {
            _class = _.omit(_class, ["__v"]);
            parent = _.omit(parent, ["__v"]);
            data = _.omit(data, ["classId", "parentId", "__v"]);

            data.class = _class;
            data.parent = parent;
           return Promise.resolve(data);
        });

    }
}
module.exports = {
    getInst: () => {
        return new StudentService();
    }
}