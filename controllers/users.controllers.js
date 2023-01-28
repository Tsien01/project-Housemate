var _a = require("../models/users.models"), selectUserByEmail = _a.selectUserByEmail, insertNewUser = _a.insertNewUser, authenticateUserLogin = _a.authenticateUserLogin;
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
    console.log("postNewUser working...");
    var email = request.body.email;
    var plainTextPwd = request.body.password;
    // send to model
    insertNewUser(email, plainTextPwd)
        .then(function (emailOutput) {
        // I can't seem to get anything back from mongoose to go in the emailOutput variable, im probably doing it wrong. So im just returning the originally provided email here temporarily
        var responseObject = { email: email };
        response.status(201).send(responseObject);
    })
        .catch(function (err) {
        console.log("insertNewUser Fail");
        next(err);
    });
};
//# sourceMappingURL=users.controllers.js.map