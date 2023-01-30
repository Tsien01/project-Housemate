"use strict";
exports.__esModule = true;
exports.loginRegister = void 0;
var mongoose_1 = require("mongoose");
var userSchema_1 = require("./userSchema");
exports.loginRegister = new mongoose_1["default"].Schema([userSchema_1.userSchema]);
