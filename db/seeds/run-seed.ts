import mongoose, { mongo } from "mongoose"

async function main () {
    await mongoose.connect("mongodb://127.0.0.1:27017/")
    
    mongoose.connection.useDb("HousemateTest") //not working atm
    const entry = new User({
        userId: 1, 
        name: "Bob", 
        email: "bobbybob@yahoo.com", 
        permissions: {
            hash: "testing", 
            salt: "salting", 
            membershipKey: "householdKey", 
        }
    })
    await entry.save().then(() => {
        console.log(entry.email);
    }); 
}

interface Permissions {
    hash: string, 
    salt: string, 
    membershipKey: string,     
}

interface UserData {
    userId: number, 
    name: string, 
    email: string, 
    permissions: Permissions, 
    picture?: string, 
}

const permissionsSchema = new mongoose.Schema <Permissions> ({
    hash: {type: String, required: true}, 
    salt: {type: String, required: true}, 
    membershipKey: {type: String, required: true}
})

const userSchema = new mongoose.Schema <UserData> ({
    userId: {type: Number, required: true}, 
    name: {type: String, required: true}, 
    email: {type: String, match: /^\S+@\S+\.\S+$/, required: true}, 
    permissions: {type: permissionsSchema, required:true}, 
    picture: {type: String, required: false}, 
})

const User = mongoose.model<UserData>("User", userSchema)

main()
.then(() => {
    console.log("I'm working!");
    return true
})
.catch((err) => {
    console.log(err);
})