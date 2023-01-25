import mongoose from "mongoose";
import * as dotenv from "dotenv"

const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `${__dirname}/../.env.${ENV}`
})

if (!process.env.MONGODATABASE && !process.env.MONGOURL) {
    throw new Error(`MONGODATABASE or MONGOURL not set`)
}
const databasePath: string = process.env.MONGODATABASE ? `mongodb://localhost:27017/${process.env.MONGODATABASE}` : `mongodb://localhost:27017/${process.env.MONGOURL}`

export const db = mongoose.createConnection(databasePath)
console.log(`${ENV} is the ENV, connected to ${databasePath}`);