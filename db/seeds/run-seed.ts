import mongoose from "mongoose"
import { seed } from "./seed";


seed()
.then(() => {
    mongoose.disconnect()
})
.catch((err) => {
    console.log(err);
})