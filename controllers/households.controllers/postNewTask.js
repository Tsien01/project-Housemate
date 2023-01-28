"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewTask = void 0;
var insertNewTask_1 = require("../../models/households.models/insertNewTask");
function postNewTask(req, res, next) {
    (0, insertNewTask_1.insertNewTask)(req.body).then(function (updatedHousehold) {
        res.status(200).send({ household: updatedHousehold });
    }).catch(function (err) { next(err); });
}
exports.postNewTask = postNewTask;
//# sourceMappingURL=postNewTask.js.map