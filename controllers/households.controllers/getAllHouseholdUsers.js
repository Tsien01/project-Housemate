"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHouseholdUsers = void 0;
var findAllHouseholdUsers_1 = require("../../models/households.models/findAllHouseholdUsers");
function getAllHouseholdUsers(req, res, next) {
    (0, findAllHouseholdUsers_1.findAllHousehouldUsers)(req);
}
exports.getAllHouseholdUsers = getAllHouseholdUsers;
//# sourceMappingURL=getAllHouseholdUsers.js.map