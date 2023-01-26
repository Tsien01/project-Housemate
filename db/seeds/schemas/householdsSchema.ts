import mongoose from "mongoose";
import { HouseholdUsersObjectInterface, householdUsersSchema } from "./householdUsersSchema";
import { TasksObjectInterface, tasksSchema } from "./tasksSchema";

export interface HouseholdObjectInterface extends HouseholdUsersObjectInterface, TasksObjectInterface {
    name: string, 
    household_password: string, 
    description: string, 
    users: Array<HouseholdUsersObjectInterface>,
    tasks: Array<TasksObjectInterface>,
    currWinner: string, 
}

export interface HouseholdsArrayInterface extends Array<HouseholdObjectInterface> {}

export const householdObjectSchema = new mongoose.Schema <HouseholdObjectInterface> ({
    name: {type: String, required: true}, 
    household_password: {type: String, required: true}, 
    description: {type: String, required: false}, 
    users: [householdUsersSchema], 
    tasks: [tasksSchema], 
    currWinner: {type: String, required: true}, 
})

export const householdsSchema = new mongoose.Schema <HouseholdsArrayInterface> ([householdObjectSchema])