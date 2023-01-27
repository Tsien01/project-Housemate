"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import cors from "cors"
var express = require("express");
var app = express();
var usersRouter = require("./routers/users.routers");
var householdsRouter = require("./routers/households.routers");
var errors_controllers_1 = require("./controllers/errors.controllers");
// app.use(cors())
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/households", householdsRouter);
app.use(errors_controllers_1.handleErrors);
module.exports = app;
//# sourceMappingURL=app.js.map