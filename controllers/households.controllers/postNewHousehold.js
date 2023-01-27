"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewHousehold = void 0;
var insertNewHousehold_1 = require("../../models/households.models/insertNewHousehold");
function postNewHousehold(req, res, next) {
    (0, insertNewHousehold_1.insertNewHousehold)(req);
}
exports.postNewHousehold = postNewHousehold;
//# sourceMappingURL=postNewHousehold.js.map