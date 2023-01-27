"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var ENV = process.env.NODE_ENV || 'development';
dotenv.config({
    path: "".concat(__dirname, "/../.env.").concat(ENV)
});
if (!process.env.MONGODATABASE && !process.env.MONGOURL) {
    throw new Error("MONGODATABASE or MONGOURL not set");
}
var databasePath = process.env.MONGODATABASE ? "mongodb://localhost:27017/".concat(process.env.MONGODATABASE) : "mongodb://localhost:27017/".concat(process.env.MONGOURL);
exports.db = mongoose_1.default.createConnection(databasePath);
console.log("".concat(ENV, " is the ENV, connected to ").concat(databasePath));
//# sourceMappingURL=connection.js.map