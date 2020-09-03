var app = require('../app');
var BaseService = require('./baseService');
var jwt = require('jsonwebtoken');
var codes = require('../codes.json');
var config = require('../config.json');

class RoleService extends BaseService{}

function validateData(body) {
    var model = require("../Models/role.model").getInst();
    var username = body.username;
    return model.getRole({username: username}).then(function(data) {
        console.log("Vishal@@       DATA!!!!!!!!!  ", JSON.stringify(data));
        if(data && data.length > 0) {
            throw new Error(codes["USERNAME_ALREADY_EXISTS"]);
        } 
    });
}

RoleService.prototype.signup = function(body) {
    var model = require("../Models/role.model").getInst();
    if(body) {
        return validateData(body)
            .then(function() {
                return model.createRole(body);
            }).then(function(user) {
                var userData = {};
                if(user.username) {
                    userData.username = user.username;
                }
                var token = jwt.sign(userData, config.privateKey);
                return {token};
            });
    }
};

RoleService.prototype.login = function(body) {
    var model = require("../Models/role.model").getInst();
    if(body) {
        return model.getRole(body)
            .then(function(userData) {
                if(!userData || userData.length === 0) {
                    throw new Error(codes["LOGIN_FAILED"]);
                }
                return userData[0];
            }).then(function(userData) {
                var response = {};
                var token = jwt.sign({userName: body.username}, config.privateKey);
                response.token = token;
                if(userData.type === "Parent") {
                    var roleId = userData._id;
                    var parentModel = require('../Models/parent.model').getInst();
                    var studentModel = require('../Models/student.model').getInst();
                    return parentModel.getParents({role: roleId}).then(function(parents) {
                        var parentId = parents[0]._id;
                        return studentModel.getStudents({parent: parentId}).then(function(students) {
                            var student = students[0].toObject(students[0]);
                            student.parent = parents[0];
                            response.student = student;
                            return response;
                        });
                    });
                }
                return response;
            });
    }
};

module.exports = {
    getInst: () => {
        return new RoleService();
    }
}