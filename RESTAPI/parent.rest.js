var Promise = require('bluebird');
var codes = require('../codes.json');


module.exports = function (app) {
    var bodyparser = require('body-parser');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/school/api/parent', (req, res) => {
        var serviceInst = require('../Service/parent.service').getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
       
        return serviceInst.addParent(req.body).then(function (data) {
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

    app.get('/school/api/parent', (req, res) => {
        var serviceInst = require('../Service/parent.service').getInst();

        return serviceInst.getParents(req.query).then(function (data) {
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


    app.get('/school/api/parent/:id', (req, res) => {
        var serviceInst = require('../Service/parent.service').getInst();
        return serviceInst.getParent(req.params.id).then(function (data) {
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


    app.put('/school/api/parent/:id', (req, res) => {
        var serviceInst = require('../Service/parent.service').getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
        var opts = {};
        if (req.params.id) {
            opts.id = req.params.id;    
        }

        return serviceInst.updateParent(opts, req.body).then(function (data) {
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


    app.delete('/school/api/parent/:id', (req, res) => {
        var serviceInst = require('../Service/parent.service').getInst();

        return serviceInst.deleteParent(req.params.id).then(function (data) {
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
    
    app.get('/school/api/parentsmeta', (req, res) => {
        var serviceInst = require('../Service/parent.service').getInst();
       

        return serviceInst.getParentsMeta().then(function(data) {
            if(!data) {
                res.status("400");
                res.send(codes["ERR_IN_FETCH"]);
            }
            res.send(data);
        });
    });
};