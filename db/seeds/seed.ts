import mongoose from "mongoose";
import { loginRegister, UsersArray } from "./schemas/loginRegisterSchema";
import { householdsSchema, HouseholdsArrayInterface } from "./schemas/householdsSchema";
import { households } from "../testData/households";
import { loginData } from "../testData/loginRegister";
import { db } from "../connection";

export async function seed () {    
    const Users = db.model <UsersArray> ("User", loginRegister)
    const Households = db.model <HouseholdsArrayInterface> ("Household", householdsSchema)
    await Users.deleteMany({})
    
    await Households.deleteMany({})
    
    const usersEntry = new Users(loginData)
    await usersEntry.save()
    .catch((err) => {
            console.log(err);
    }); 

    const householdsEntry = new Households(households)
    await householdsEntry.save()
    .catch((err) => {
        console.log(err);
    })    
}