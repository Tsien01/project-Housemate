import mongoose from "mongoose"
import { seed } from "./seed";
import { _db } from "../connection";


seed(_db)
.then(() => {
    mongoose.disconnect()
})
.catch((err) => {
    console.log(err);
})