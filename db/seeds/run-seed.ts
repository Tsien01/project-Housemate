import mongoose from "mongoose"
import { loginRegister, UsersArray } from "./schemas/loginRegisterSchema";
import { households } from "../testData/households";
import { loginData } from "../testData/loginRegister";

async function main () {
    await mongoose.connect("mongodb://localhost:27017/HousemateTest")

    const entry = new Users(loginData)
    
    await entry.save()
    .catch(
        (err) => {
            console.log(err);
    }); 
}

const Users = mongoose.model <UsersArray> ("Users", loginRegister)

main()
.then(() => {
    console.log("I'm working!");
    mongoose.disconnect()
})
.catch((err) => {
    console.log(err);
})