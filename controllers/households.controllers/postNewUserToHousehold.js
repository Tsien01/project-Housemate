"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewUserToHousehold = void 0;
var insertNewUserToHousehold_1 = require("../../models/households.models/insertNewUserToHousehold");
var postNewUserToHousehold = function (req, res, next) {
    (0, insertNewUserToHousehold_1.insertNewUserToHousehold)(req);
};
exports.postNewUserToHousehold = postNewUserToHousehold;
// isn't this covered by the patchHouseholdUsers and postNewHousehold end points?
// we agreed that households can't be created without a user and the last user leaving a household deletes it
// should we delete this file?
// comments by Adrian
//# sourceMappingURL=postNewUserToHousehold.js.map