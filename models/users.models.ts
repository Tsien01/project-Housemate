import { db } from "../db/connection";
import { loginRegister } from "../db/seeds/schemas/loginRegisterSchema";
import { householdObjectSchema } from "../db/seeds/schemas/householdsSchema";
const bcrypt = require("bcrypt");


exports.selectUserByEmail = async (user_email) => {
  if (/^\S+@\S+\.\S+$/.test(user_email) === false) {
    return Promise.reject({
      message: "400 Bad Request", 
      status: 400, 
    })
  }

  const dbModel = await db.model("user", loginRegister);
  
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
  const email = body.email
  const dbModel = await db.model("user", loginRegister);
  const user = await dbModel.find({ email: email })
  
  if (await bcrypt.compare(body.password, user[0]["hashed_password"])) {
    const dbHouseholdModel = await db.model("household", householdObjectSchema);
    const household = await dbHouseholdModel.find({"users.email": email})
    return {household: household[0], email: email}
  }
  return Promise.reject({message: "401 unauthorised", status: 401})
}

exports.insertNewUser = (body) => {
  console.log("I'm not ready!");
} 