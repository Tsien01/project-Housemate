import mongoose from "mongoose"
import { UserData } from "./schemas/userSchema";
import { loginRegister } from "./schemas/loginRegisterSchema";

async function main () {
    await mongoose.connect("mongodb://localhost:27017/HousemateTest")

    const entry = new Users()

    await entry.save()
    .catch(
        (err) => {
            console.log(err);
    }); 
}

const Users = mongoose.model<UserData>("Users", loginRegister)

main()
.then(() => {
    console.log("I'm working!");
    mongoose.disconnect()
})
.catch((err) => {
    console.log(err);
})