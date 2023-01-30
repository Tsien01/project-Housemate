"use strict";
exports.__esModule = true;
exports.householdsSchema = exports.householdObjectSchema = void 0;
var mongoose_1 = require("mongoose");
var householdUsersSchema_1 = require("./householdUsersSchema");
var tasksSchema_1 = require("./tasksSchema");
exports.householdObjectSchema = new mongoose_1["default"].Schema({
    name: { type: String, required: true },
    household_password: { type: String, required: true },
    description: { type: String, required: false },
    users: [householdUsersSchema_1.householdUsersSchema],
    tasks: [tasksSchema_1.tasksSchema],
    currWinner: { type: String, required: true }
});
exports.householdsSchema = new mongoose_1["default"].Schema([exports.householdObjectSchema]);
