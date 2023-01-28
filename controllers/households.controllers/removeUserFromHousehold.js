"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromHousehold = void 0;
var deleteUserFromHousehold_1 = require("../../models/households.models/deleteUserFromHousehold");
function removeUserFromHousehold(req, res, next) {
    (0, deleteUserFromHousehold_1.deleteUserFromHousehold)(req.params.user_email)
        .then(function () {
        res.status(204).send();
    })
        .catch(function (err) { next(err); });
}
exports.removeUserFromHousehold = removeUserFromHousehold;
//# sourceMappingURL=removeUserFromHousehold.js.map