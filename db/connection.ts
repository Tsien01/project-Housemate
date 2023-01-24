import * as dotenv from "dotenv"

const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `${__dirname}/../.env.${ENV}`
})
console.log(`${ENV} is the ENV`);


if (!process.env.MONGODATABASE && !process.env.MONGOURL) {
    throw new Error(`MONGODATABASE or MONGOURL not set`)
}
let _db: string = ""
if (process.env.MONGODATABASE) {
    _db = process.env.MONGODATABASE
} else if (process.env.MONGOURL) {
    _db = process.env.MONGOURL
}
console.log(`${_db} is the _db`);


export { _db }