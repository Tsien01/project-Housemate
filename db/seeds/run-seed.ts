import mongoose from "mongoose"
import { loginRegister, UsersArray } from "./schemas/loginRegisterSchema";
import { householdsSchema, HouseholdsArrayInterface } from "./schemas/householdsSchema";
import { households } from "../testData/households";
import { loginData } from "../testData/loginRegister";

const Users = mongoose.model <UsersArray> ("User", loginRegister)
const Households = mongoose.model <HouseholdsArrayInterface> ("Household", householdsSchema)
async function main () {
    await mongoose.connect("mongodb://localhost:27017/HousemateTest")
    const usersEntry = new Users(loginData)
    
    await usersEntry.save()
    .catch((err) => {
            console.log(err);
    }); 
    const householdsEntry = new Households(households)
    householdsEntry.households.forEach((household, index) => {
        householdsEntry.markModified(`households[${index}].users`)
        householdsEntry.markModified(`households[${index}].tasks`)
    })
    
    // console.log(householdsEntry);
    

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