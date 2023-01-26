import mongoose from "mongoose";

export interface UserData {
    user_id: string, 
    household_id: string, 
    firstName: string, 
    lastName: string, 
    picture?: string, 
    email: string, 
    hashed_password: string,  
    household_password: string, 
}

export const userSchema = new mongoose.Schema <UserData> ({
    user_id: {type: String, required: true}, 
    household_id: {type: String, required: true}, 
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    picture: {type: String, required: false}, 
    email: {type: String, match: /^\S+@\S+\.\S+$/, required: true}, 
    hashed_password: {type: String, required: true}, 
    household_password: {type: String, required: true}, 
})