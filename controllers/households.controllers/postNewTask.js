"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewTask = void 0;
var insertNewTask_1 = require("../../models/households.models/insertNewTask");
function postNewTask(req, res, next) {
    (0, insertNewTask_1.insertNewTask)(req);
}
exports.postNewTask = postNewTask;
//# sourceMappingURL=postNewTask.js.map