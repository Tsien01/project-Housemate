"use strict";
exports.__esModule = true;
exports.householdUsersSchema = void 0;
var mongoose_1 = require("mongoose");
exports.householdUsersSchema = new mongoose_1["default"].Schema({
    permissions: { type: [String], required: true },
    currScore: { type: Number, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, match: /^\S+@\S+\.\S+$/, required: true }
});
