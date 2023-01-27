import mongoose from "mongoose"

export interface HouseholdUsersObjectInterface {
    currScore: number
    name: string, 
    picture: string, 
    email: string, 
    permissions: ["admin" | "member"], 
}

export const householdUsersSchema = new mongoose.Schema <HouseholdUsersObjectInterface> ({
    permissions: {type: [String], required: true}, 
    currScore: {type: Number, required: true}, 
    name: {type: String, required: true}, 
    picture: {type: String, required: true}, 
    email: {type: String, required: true}, 
})