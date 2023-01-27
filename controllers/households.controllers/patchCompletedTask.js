"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchCompletedTask = void 0;
var markTaskCompleted_1 = require("../../models/households.models/markTaskCompleted");
function patchCompletedTask(req, res, next) {
    (0, markTaskCompleted_1.markTaskCompleted)(req);
}
exports.patchCompletedTask = patchCompletedTask;
//# sourceMappingURL=patchCompletedTask.js.map