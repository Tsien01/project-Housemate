"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../db/connection");
var loginRegisterSchema_1 = require("../db/seeds/schemas/loginRegisterSchema");
var householdsSchema_1 = require("../db/seeds/schemas/householdsSchema");
// bcrypt for hashing
var bcrypt = require("bcrypt");
// utils for email verification
var utils = require("../utils/utils");
// h / error objects
var badreq = {
    message: "400 Bad Request",
    status: 400,
};
var errconflict = {
    message: "409 Conflict",
    status: 409,
};
exports.selectUserByEmail = function (user_email) { return __awaiter(void 0, void 0, void 0, function () {
    var dbModel, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (/^\S+@\S+\.\S+$/.test(user_email) === false) {
                    return [2 /*return*/, Promise.reject({
                            message: "400 Bad Request",
                            status: 400,
                        })];
                }
                return [4 /*yield*/, connection_1.db.model("user", loginRegisterSchema_1.loginRegister)];
            case 1:
                dbModel = _a.sent();
                return [4 /*yield*/, dbModel.find({ email: user_email })];
            case 2:
                user = _a.sent();
                if (user.length === 0) {
                    return [2 /*return*/, Promise.reject({
                            message: "404 Not Found",
                            status: 404,
                        })];
                }
                return [2 /*return*/, user[0]];
        }
    });
}); };
exports.authenticateUserLogin = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var email, dbModel, user, dbHouseholdModel, household;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = body.email;
                return [4 /*yield*/, connection_1.db.model("user", loginRegisterSchema_1.loginRegister)];
            case 1:
                dbModel = _a.sent();
                return [4 /*yield*/, dbModel.find({ email: email })];
            case 2:
                user = _a.sent();
                if (user.length === 0) {
                    return [2 /*return*/, Promise.reject({
                            message: "400 Bad Request",
                            status: 400,
                        })];
                }
                return [4 /*yield*/, bcrypt.compare(body.password, user[0]["hashed_password"])];
            case 3:
                if (!_a.sent()) return [3 /*break*/, 6];
                return [4 /*yield*/, connection_1.db.model("household", householdsSchema_1.householdObjectSchema)];
            case 4:
                dbHouseholdModel = _a.sent();
                return [4 /*yield*/, dbHouseholdModel.find({ "users.email": email })];
            case 5:
                household = _a.sent();
                return [2 /*return*/, { household: household[0], email: email }];
            case 6:
                console.log("password doesn't match");
                return [2 /*return*/, Promise.reject({ message: "401 Unauthorised", status: 401 })];
        }
    });
}); };
exports.insertNewUser = function (email, plainTextPwd) { return __awaiter(void 0, void 0, void 0, function () {
    var validEmail, hashedPwd, Users, userByEmail, mongoInput;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // filter out bad requests, check if email is correct format
                if (email === undefined ||
                    plainTextPwd === undefined ||
                    email.length === 0 ||
                    plainTextPwd.length === 0 ||
                    utils.validateEmail(email) === false) {
                    return [2 /*return*/, Promise.reject(badreq)];
                }
                validEmail = email;
                hashedPwd = bcrypt.hashSync(plainTextPwd, bcrypt.genSaltSync());
                Users = connection_1.db.model("User", loginRegisterSchema_1.loginRegister);
                return [4 /*yield*/, Users.find({
                        email: validEmail,
                    })];
            case 1:
                userByEmail = _a.sent();
                if (userByEmail.length > 0) {
                    // email exists
                    return [2 /*return*/, Promise.reject(errconflict)];
                }
                mongoInput = [{ email: validEmail, hashed_password: hashedPwd }];
                return [4 /*yield*/, Users.insertMany(mongoInput)
                        .then(function (mongoOutput) {
                        console.log("insertNewUser Success");
                        return mongoOutput;
                    })
                        .catch(function (err) {
                        return Promise.reject(err);
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=users.models.js.map