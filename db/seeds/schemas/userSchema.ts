import mongoose from "mongoose";

export interface UserData {
    email: string, 
    hashed_password: string, 
}

export const userSchema = new mongoose.Schema <UserData> ({
    email: {type: String, match: /^\S+@\S+\.\S+$/, required: true}, 
    hashed_password: {type: String, required: true}, 
})