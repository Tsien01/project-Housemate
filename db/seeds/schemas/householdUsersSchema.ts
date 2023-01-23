import mongoose from "mongoose"

export interface HouseholdUsersObjectInterface {
    id: string, 
    permissions: ["admin" | "member"], 
    currScore: number
}

export const householdUsersSchema = new mongoose.Schema <HouseholdUsersObjectInterface> ({
    id: {type: String, required: true}, 
    permissions: {type: [String], required: true}, 
    currScore: {type: Number, required: true}, 
})