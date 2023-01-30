"use strict";
exports.__esModule = true;
exports.tasksSchema = void 0;
var mongoose_1 = require("mongoose");
exports.tasksSchema = new mongoose_1["default"].Schema({
    email: { type: String, match: /^\S+@\S+\.\S+$/, required: true },
    created_at: { type: String, required: true },
    deadline: {},
    title: { type: String, required: true },
    description: { type: String, required: false },
    completion: { type: Boolean, required: true },
    task_value: { type: Number, required: true },
    tags: [String]
});
