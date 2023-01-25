// const db = require("../db/connection")
import { db } from "../db/connection";
import { loginRegister } from "../db/seeds/schemas/loginRegisterSchema";

exports.selectUserById = async (user_id) => {
    console.log(await db.model("user",loginRegister).find({}), "<<<<<< test");
   await db.model("user",loginRegister).find({}).then((data)=>{
        console.log(data, "data in model");
        return data
    })
}