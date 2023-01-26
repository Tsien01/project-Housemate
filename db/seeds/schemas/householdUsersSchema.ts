import mongoose from "mongoose"

export interface HouseholdUsersObjectInterface {
    currScore: number
    firstName: string, 
    lastName: string, 
    picture: string, 
    email: string, 
    permissions: ["admin" | "member"], 
}

export const householdUsersSchema = new mongoose.Schema <HouseholdUsersObjectInterface> ({
    currScore: {type: Number, required: true}, 
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    picture: {type: String, required: true}, 
    email: {type: String, required: true}, 
    permissions: {type: [String], required: true}, 
})