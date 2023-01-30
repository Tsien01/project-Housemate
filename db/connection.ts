import mongoose from "mongoose";
import * as dotenv from "dotenv"

const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `${__dirname}/../.env.${ENV}`
})

if (!process.env.MONGODATABASE && !process.env.MONGOURL) {
    throw new Error(`MONGODATABASE or MONGOURL not set`)
}
let db;
const databasePath: string = process.env.MONGODATABASE ? `mongodb://localhost:27017/${process.env.MONGODATABASE}` : process.env.MONGOURL
if (ENV === "production") {
    db = mongoose.createConnection(databasePath, { user: process.env.USER, pass: process.env.PASS }).asPromise()
} else {
    db = mongoose.createConnection(databasePath).asPromise()
}

export { db }
console.log(`${ENV} is the ENV, connected to ${databasePath}`);