"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewHousehold = void 0;
var insertNewHousehold_1 = require("../../models/households.models/insertNewHousehold");
function postNewHousehold(req, res, next) {
    (0, insertNewHousehold_1.insertNewHousehold)(req.body).then(function (household) {
        res.status(200).send({ household: household });
    }).catch(function (err) { next(err); });
}
exports.postNewHousehold = postNewHousehold;
//# sourceMappingURL=postNewHousehold.js.map