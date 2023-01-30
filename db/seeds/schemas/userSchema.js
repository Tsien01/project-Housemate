"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1["default"].Schema({
    email: { type: String, match: /^\S+@\S+\.\S+$/, required: true },
    hashed_password: { type: String, required: true }
});
