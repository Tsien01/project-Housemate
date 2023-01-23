import mongoose from "mongoose"
import { loginRegister, UsersArray } from "./schemas/loginRegisterSchema";
import { householdsSchema, HouseholdsArrayInterface } from "./schemas/householdsSchema";
import { households } from "../testData/households";
import { loginData } from "../testData/loginRegister";

async function main () {
    const db = await mongoose.createConnection("mongodb://localhost:27017/HousemateTest").asPromise()
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


main()
.then(() => {
    console.log("I'm working!");
    mongoose.disconnect()
})
.catch((err) => {
    console.log(err);
})