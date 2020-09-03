var codes = require("./codes.json");
var jwt = require("jsonwebtoken");
var config = require("./config.json");

module.exports = function(app) {
    var bodyparser = require('body-parser');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.use("/school/api", function(req, res, next) {
        var tokenInfo = req.headers.authorization;
        var type = req.headers.type;
        var token;
        if(type !== "Admin") {
            res.status(403);
            res.send(codes["INV_ACCESS"]);
        }
        if(!tokenInfo) {
            res.status(403);
            res.send(codes["TOKEN_REQUIRED"]);
        }
        token = tokenInfo.split(" ")[1];
        var decoded;
        try {
            decoded = jwt.verify(token, config.privateKey)
        } catch(err) {
            res.status(403);
            res.send(codes["INVALID_TOKEN"]);
        }
        next();
    });
};