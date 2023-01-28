const {
  selectUserByEmail,
  insertNewUser,
  authenticateUserLogin,
} = require("../models/users.models");

exports.getUserByEmail = (req, res, next) => {
  selectUserByEmail(req.params.user_email)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.logInUser = (req, res, next) => {
  authenticateUserLogin(req.body)
    .then((household) => {
      res.status(200).send(household);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewUser = (request, response, next) => {
  console.log("postNewUser working...");

  const email = request.body.email;
  const plainTextPwd = request.body.password;

  // send to model
  insertNewUser(email, plainTextPwd)
    .then((emailOutput) => {
      // I can't seem to get anything back from mongoose to go in the emailOutput variable, im probably doing it wrong. So im just returning the originally provided email here temporarily
      const responseObject = { email: email };
      response.status(201).send(responseObject);
    })
    .catch((err) => {
      console.log("insertNewUser Fail");
      next(err);
    });
};
