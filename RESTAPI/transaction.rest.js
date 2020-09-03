var Promise = require('bluebird');
var codes = require('../codes.json');


module.exports = function (app) {
    var bodyparser = require('body-parser');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/school/api/transaction', (req, res) => {
        var serviceInst = require('../Service/transaction.service').getInst();
        if (!req.body) {
            res.status("400");
            res.send(codes["MISSING_BODY"]);
        }
       
        return serviceInst.addTransaction(req.body).then(function (data) {
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

    app.get('/school/api/transaction', (req, res) => {
        var serviceInst = require('../Service/transaction.service').getInst();

        return serviceInst.getTransactions(req.query).then(function (data) {
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
};