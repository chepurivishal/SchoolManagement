var Promise = require('bluebird');
var codes = require('../codes.json');


module.exports = function (app) {
    var bodyparser = require('body-parser');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/school/signup', (req, res) => {
        var serviceInst = require("../Service/role.service").getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
        return serviceInst.signup(req.body).then(function (data) {
            if (!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        });
    });

    app.post('/school/login', (req, res) => {
        var serviceInst = require("../Service/role.service").getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
        return serviceInst.login(req.body).then(function(data) {
            if (!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        }).catch((err) => {
            res.status(403);
            res.send({
                "Error": codes["LOGIN_FAILED"]
            });
        });
    });
};