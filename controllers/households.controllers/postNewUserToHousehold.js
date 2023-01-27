"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewUserToHousehold = void 0;
var insertNewUserToHousehold_1 = require("../../models/households.models/insertNewUserToHousehold");
var postNewUserToHousehold = function (req, res, next) {
    (0, insertNewUserToHousehold_1.insertNewUserToHousehold)(req);
};
exports.postNewUserToHousehold = postNewUserToHousehold;
//# sourceMappingURL=postNewUserToHousehold.js.map