import mongoose from "mongoose";
import { loginRegister, UsersArray } from "./schemas/loginRegisterSchema";
import { householdsSchema, HouseholdsArrayInterface } from "./schemas/householdsSchema";
import { households } from "../testData/households";
import { loginData } from "../testData/loginRegister";

export async function seed (database: string) {
    const db = await mongoose.createConnection(`mongodb://localhost:27017/${database}`).asPromise()
    console.log("i'm connected!");
    
    const Users = db.model <UsersArray> ("User", loginRegister)
    const Households = db.model <HouseholdsArrayInterface> ("Household", householdsSchema)
    await Users.deleteMany({})
    console.log("deleted Users!");
    
    await Households.deleteMany({})
    console.log("deleted Households!");
    
    
    const usersEntry = new Users(loginData)
    await usersEntry.save()
    .catch((err) => {
            console.log(err);
    }); 
    console.log("saved Users!");
    

    const householdsEntry = new Households(households)
    await householdsEntry.save()
    .catch((err) => {
        console.log(err);
    })
    console.log("saved households!");
    
}