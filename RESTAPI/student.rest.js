var Promise = require('bluebird');
var codes = require('../codes.json');


module.exports = function (app) {
    var bodyparser = require('body-parser');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/school/api/student', (req, res) => {
        var serviceInst = require('../Service/student.service').getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
       
        return serviceInst.addStudent(req.body).then(function (data) {
            if (!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        }).catch((err) => {
            res.status("500");
            res.send({
                "Error": codes["INTERNAL_SERVER_ERR"]
            });
        });

    });

    app.get('/school/api/student', (req, res) => {
        var serviceInst = require('../Service/student.service').getInst();

        return serviceInst.getStudents(req.query).then(function (data) {
            if (!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        })
        // .catch((err) => {
        //     res.status("500");
        //     res.send({
        //         "Error": codes["INTERNAL_SERVER_ERR"]
        //     });
        // });
    });


    app.get('/school/api/student/:id', (req, res) => {
        var serviceInst = require('../Service/student.service').getInst();
        return serviceInst.getStudent(req.params.id).then(function (data) {
            if (!data) {
                res.status("400");
                res.send(codes['ERR_IN_FETCH']);
            }
            res.send(data);
        }).catch((err) => {
            res.status("500");
            res.send({
                "Error": codes["INTERNAL_SERVER_ERR"]
            });
        });
    });


    app.put('/school/api/student/:id', (req, res) => {
        var serviceInst = require('../Service/student.service').getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
        var opts = {};
        if (req.params.id) {
            opts.id = req.params.id;
        }

        return serviceInst.updateStudent(opts, req.body).then(function (data) {
            if (!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        }).catch((err) => {
            res.status("500");
            res.send({
                "Error": codes["INTERNAL_SERVER_ERR"]
            });
        });
    });


    app.delete('/school/api/class/:id', (req, res) => {
        var serviceInst = require('../Service/student.service').getInst();

        return serviceInst.deleteStudent(req.params.id).then(function (data) {
            if (!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        }).catch((err) => {
            res.status("500");
            res.send({
                "Error": codes["INTERNAL_SERVER_ERR"]
            });
        });
    });
    
    app.get('/school/api/studentsmeta', (req, res) => {
        var serviceInst = require('../Service/classes.service').getInst();
       

        return serviceInst.getStudentsMeta().then(function(data) {
            if(!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        });
    });
};