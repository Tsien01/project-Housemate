// const db = require("../db/connection")
import { db } from "../db/connection";
import { loginRegister } from "../db/seeds/schemas/loginRegisterSchema";

exports.selectUserById = async (user_id) => {
  console.log(await db.model("user", loginRegister).find({}), "<<<<<< test");
  const dbModel = await db.model("user", loginRegister);

  console.log(dbModel, "this is the dbmodel")

  const user = await dbModel.aggregate().unwind({ path: `$users` }).match({ "users.user_id": `${user_id}`})

  return user[0].users;
};
