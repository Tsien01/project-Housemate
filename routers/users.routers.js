"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var _a = require("../controllers/users.controllers"), getUserByEmail = _a.getUserByEmail, logInUser = _a.logInUser, postNewUser = _a.postNewUser;
var usersRouter = express.Router();
usersRouter.route("/:user_email").get(getUserByEmail);
usersRouter.post("/authentication", logInUser);
usersRouter.post("/", postNewUser);
module.exports = usersRouter;
//# sourceMappingURL=users.routers.js.map