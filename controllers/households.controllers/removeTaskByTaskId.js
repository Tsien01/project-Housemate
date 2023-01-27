"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTaskByTaskId = void 0;
var deleteTaskByTaskId_1 = require("../../models/households.models/deleteTaskByTaskId");
function removeTaskByTaskId(req, res, next) {
    (0, deleteTaskByTaskId_1.deleteTaskByTaskId)(req, req);
}
exports.removeTaskByTaskId = removeTaskByTaskId;
//# sourceMappingURL=removeTaskByTaskId.js.map