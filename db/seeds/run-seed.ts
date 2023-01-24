import mongoose from "mongoose"
import { seed } from "./seed";
import { db } from "../connection";


seed()
.then(() => {
    mongoose.disconnect()
})
.catch((err) => {
    console.log(err);
})