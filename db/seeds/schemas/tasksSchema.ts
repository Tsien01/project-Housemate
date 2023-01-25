import mongoose from "mongoose";

export interface TasksObjectInterface {
    task_id: string, 
    user_id: string, 
    created_at: string, 
    deadline: string | null, 
    title: string, 
    description: string, 
    completion: boolean, 
    task_value: number, 
    tags: string | null, 
}

export const tasksSchema = new mongoose.Schema <TasksObjectInterface> ({
    task_id: {type: String, required: true}, 
    user_id: {type: String, required: true}, 
    created_at: {type: String, required: true}, 
    deadline: {}, 
    title: {type: String, required: true}, 
    description: {type: String, required: true}, 
    completion: {type: Boolean, required: true}, 
    task_value: {type: Number, required: true}, 
    tags: {}, 
})