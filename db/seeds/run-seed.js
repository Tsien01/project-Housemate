"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var seed_1 = require("./seed");
(0, seed_1.seed)()
    .then(function () {
    mongoose_1.default.disconnect();
})
    .catch(function (err) {
    console.log(err);
});
//# sourceMappingURL=run-seed.js.map