import mongoose from "mongoose";

export interface TasksObjectInterface {
    email: string, 
    title: string, 
    created_at: string, 
    deadline: string | null, 
    description: string, 
    completion: boolean, 
    task_value: number, 
    tags: string[], 
}

export const tasksSchema = new mongoose.Schema <TasksObjectInterface> ({
    email: {type: String, match: /^\S+@\S+\.\S+$/, required: true}, 
    created_at: {type: String, required: true}, 
    deadline: {}, 
    title: {type: String, required: true}, 
    description: {type: String, required: false}, 
    completion: {type: Boolean, required: true}, 
    task_value: {type: Number, required: true}, 
    tags: [String], 
})