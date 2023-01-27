import { db } from "../db/connection";
import { loginRegister } from "../db/seeds/schemas/loginRegisterSchema";

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

exports.authenticateUserLogin = (body) => {
  console.log("I'm not ready!");
  
}

exports.insertNewUser = (body) => {
  console.log("I'm not ready!");
} 