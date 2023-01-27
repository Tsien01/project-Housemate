const {
  selectUserByEmail,
  insertNewUser,
  authenticateUserLogin,
} = require("../models/users.models");

// h / req bcrypt
const bcrypt = require("bcrypt");

// h / require utils
const utils = require("../utils/utils");

// h / error objects
const badreq = {
  message: "400 Bad Request",
  status: 400,
};

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
  const email = request.body.email;
  const plainTextPwd = request.body.password;

  // filter out bad requests, check if email is correct format
  if (
    email === undefined ||
    plainTextPwd === undefined ||
    email.length === 0 ||
    plainTextPwd.length === 0 ||
    utils.validateEmail(email) === false
  ) {
    response.status(400).send(badreq);
    //return Promise.reject(badreq);
  }

  // hash the password and store in hashedPwd variable
  const hashedPwd = bcrypt.hashSync(plainTextPwd, bcrypt.genSaltSync());

  // send to model
  insertNewUser(email, hashedPwd)
    .then((emailOutput) => {
      const responseObject = { email: emailOutput };
      console.log(responseObject);
      response.status(201).send(responseObject);
    })
    .catch((err) => {
      console.log("insertNewUser Fail 2");
      next(err);
    });
};
