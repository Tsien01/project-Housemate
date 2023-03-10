import { db } from "../db/connection";
import { loginRegister } from "../db/seeds/schemas/loginRegisterSchema";
import { householdObjectSchema } from "../db/seeds/schemas/householdsSchema";
const bcrypt = require("bcrypt");

// utils for email verification
const utils = require("../utils/utils");

// h / error objects
const badreq = {
  message: "400 Bad Request",
  status: 400,
};

const errconflict = {
  message: "409 Conflict",
  status: 409,
};

exports.selectUserByEmail = async (user_email) => {
  if (/^\S+@\S+\.\S+$/.test(user_email) === false) {
    return Promise.reject({
      message: "400 Bad Request", 
      status: 400, 
    })
  }
  const connection = await db

  const dbModel = await connection.model("user", loginRegister);
  
  const user = await dbModel.find({ email: user_email })
  if (user.length === 0) {
    return Promise.reject({
      message: "404 Not Found", 
      status: 404, 
    })
  }
  
  return user[0]
};

exports.authenticateUserLogin = async (body) => {
  const connection = await db

  const email = body.email
  const dbModel = await connection.model("user", loginRegister);
  const user = await dbModel.find({ email: email })
  if (user.length === 0) {
    return Promise.reject({
      message: "400 Bad Request", 
      status: 400, 
    })
  }
  
  if (await bcrypt.compare(body.password, user[0]["hashed_password"])) {
    const dbHouseholdModel = await connection.model("household", householdObjectSchema);
    const household = await dbHouseholdModel.find({"users.email": email})
    return {household: household[0], email: email}
  }
  console.log("password doesn't match");
  
  return Promise.reject({message: "401 Unauthorised", status: 401})
}


exports.insertNewUser = async (email, plainTextPwd) => {
  // filter out bad requests, check if email is correct format
  if (
    email === undefined ||
    plainTextPwd === undefined ||
    email.length === 0 ||
    plainTextPwd.length === 0 ||
    utils.validateEmail(email) === false
  ) {
    return Promise.reject(badreq);
  }
  const validEmail = email;

  // hash the password and store in hashedPwd variable
  const hashedPwd = await bcrypt.hash(plainTextPwd, 10);

  const connection = await db; 
  // check if email address exists
  const Users = connection.model("User", loginRegister);
  let userByEmail = await Users.find({
    email: validEmail,
  });

  if (userByEmail.length > 0) {
    // email exists
    return Promise.reject(errconflict);
  }

  // Insert user into database
  const mongoInput = { email: validEmail, hashed_password: hashedPwd }
  const newUser = await Users.create(mongoInput)
  return newUser;
};