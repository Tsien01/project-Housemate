import mongoose from "mongoose";
import { HouseholdUsersObjectInterface, householdUsersSchema } from "./householdUsersSchema";
import { TasksObjectInterface, tasksSchema } from "./tasksSchema";

export interface HouseholdObjectInterface extends HouseholdUsersObjectInterface, TasksObjectInterface {
    household_id: string, 
    name: string, 
    household_password: string, 
    description: string, 
    users: Array<HouseholdUsersObjectInterface>,
    tasks: Array<TasksObjectInterface>,
    currWinner: string, 
}

export interface HouseholdsArrayInterface extends Array<HouseholdObjectInterface> {}

export const householdObjectSchema = new mongoose.Schema <HouseholdObjectInterface> ({
    household_id: {type: String, required: true}, 
    name: {type: String, required: true}, 
    household_password: {type: String, required: true}, 
    description: {type: String, required: true}, 
    users: [householdUsersSchema], 
    tasks: [tasksSchema], 
    currWinner: {type: String, required: true}, 
})

export const householdsSchema = new mongoose.Schema <HouseholdsArrayInterface> ([householdObjectSchema])