import mongoose from "mongoose";
import { userSchema, UserData } from "./userSchema";

export interface UsersArray extends Array<UserData> {}

export const loginRegister = new mongoose.Schema <UsersArray> ([userSchema])