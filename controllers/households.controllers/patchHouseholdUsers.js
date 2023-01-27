"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchHouseholdUsers = void 0;
var updateHouseholdUsers_1 = require("../../models/households.models/updateHouseholdUsers");
function patchHouseholdUsers(req, res, next) {
    (0, updateHouseholdUsers_1.updateHouseholdUsers)(req);
}
exports.patchHouseholdUsers = patchHouseholdUsers;
//# sourceMappingURL=patchHouseholdUsers.js.map