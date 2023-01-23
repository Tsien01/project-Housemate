import mongoose from "mongoose";

export interface TasksObjectInterface {
    task_id: string, 
    user_id: string, 
    timestamp: string, 
    title: string, 
    description: string, 
    completion: boolean, 
    task_value: number, 
    tags: string, 
}

export const tasksSchema = new mongoose.Schema <TasksObjectInterface> ({
    task_id: {type: String, required: true}, 
    user_id: {type: String, required: true}, 
    timestamp: {type: String, required: true}, 
    title: {type: String, required: true}, 
    description: {type: String, required: true}, 
    completion: {type: Boolean, required: true}, 
    task_value: {type: Number, required: true}, 
    tags: {type: String, required: true}, 
})