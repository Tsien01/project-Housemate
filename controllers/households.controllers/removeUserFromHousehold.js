"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromHousehold = void 0;
var deleteUserFromHousehold_1 = require("../../models/households.models/deleteUserFromHousehold");
function removeUserFromHousehold(req, res, next) {
    (0, deleteUserFromHousehold_1.deleteUserFromHousehold)(req, req);
}
exports.removeUserFromHousehold = removeUserFromHousehold;
//# sourceMappingURL=removeUserFromHousehold.js.map