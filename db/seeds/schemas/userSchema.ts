import mongoose from "mongoose";

export interface UserData {
    userId: number, 
    name: string, 
    email: string, 
    picture?: string, 
}

export const userSchema = new mongoose.Schema <UserData> ({
    userId: {type: Number, required: true}, 
    name: {type: String, required: true}, 
    email: {type: String, match: /^\S+@\S+\.\S+$/, required: true}, 
    picture: {type: String, required: false}, 
})