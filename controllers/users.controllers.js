var _a = require("../models/users.models"), selectUserByEmail = _a.selectUserByEmail, insertNewUser = _a.insertNewUser, authenticateUserLogin = _a.authenticateUserLogin;
// h / req bcrypt
var bcrypt = require("bcrypt");
// h / require utils
var utils = require("../utils/utils");
// h / error objects
var badreq = {
    message: "400 Bad Request",
    status: 400,
};
exports.getUserByEmail = function (req, res, next) {
    selectUserByEmail(req.params.user_email)
        .then(function (user) {
        res.status(200).send({ user: user });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.logInUser = function (req, res, next) {
    authenticateUserLogin(req.body)
        .then(function (household) {
        res.status(200).send(household);
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postNewUser = function (request, response, next) {
    var email = request.body.email;
    var plainTextPwd = request.body.password;
    // filter out bad requests, check if email is correct format
    if (email === undefined ||
        plainTextPwd === undefined ||
        email.length === 0 ||
        plainTextPwd.length === 0 ||
        utils.validateEmail(email) === false) {
        response.status(400).send(badreq);
        //return Promise.reject(badreq);
    }
    // hash the password and store in hashedPwd variable
    var hashedPwd = bcrypt.hashSync(plainTextPwd, bcrypt.genSaltSync());
    // send to model
    insertNewUser(email, hashedPwd)
        .then(function (emailOutput) {
        var responseObject = { email: emailOutput };
        console.log(responseObject);
        response.status(201).send(responseObject);
    })
        .catch(function (err) {
        console.log("insertNewUser Fail 2");
        next(err);
    });
};
//# sourceMappingURL=users.controllers.js.map