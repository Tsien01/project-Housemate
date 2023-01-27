"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = void 0;
var findAllTasks_1 = require("../../models/households.models/findAllTasks");
function getAllTasks(req, res, next) {
    (0, findAllTasks_1.findAllTasks)(req);
}
exports.getAllTasks = getAllTasks;
//# sourceMappingURL=getAllTasks.js.map