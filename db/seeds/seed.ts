import { loginRegister, UsersArray } from "./schemas/loginRegisterSchema";
import { householdsSchema, HouseholdsArrayInterface } from "./schemas/householdsSchema";
import { households } from "../testData/households.js";
import { loginData } from "../testData/loginRegister.js";
import { db } from "../connection";

export async function seed () {
    const connection = await db
    
    const Users = await connection.model("User", loginRegister)
    const Households = await connection.model("Household", householdsSchema)
    
    await Users.deleteMany({})
    
    await Households.deleteMany({})
    
    await Users.insertMany(loginData)
    .catch((err) => {
        console.log(err);
    }); 

    await Households.insertMany(households)
    .catch((err) => {
        console.log(err);
    })    
}