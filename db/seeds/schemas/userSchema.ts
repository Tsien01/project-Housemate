import mongoose from "mongoose";

export interface UserData {
    userId: string, 
    household_id: string, 
    firstName: string, 
    lastName: string, 
    picture?: string, 
    email: string, 
    hash: string, 
    salt: string, 
    household_password: string, 
}

export const userSchema = new mongoose.Schema <UserData> ({
    userId: {type: String, required: true}, 
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    picture: {type: String, required: false}, 
    email: {type: String, match: /^\S+@\S+\.\S+$/, required: true}, 
    hash: {type: String, required: true}, 
    salt: {type: String, required: true}, 
    household_password: {type: String, required: true}, 
})