"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var postNewUserToHousehold_1 = require("../controllers/households.controllers/postNewUserToHousehold");
var postNewHousehold_1 = require("../controllers/households.controllers/postNewHousehold");
var patchHouseholdUsers_1 = require("../controllers/households.controllers/patchHouseholdUsers");
var getAllTasks_1 = require("../controllers/households.controllers/getAllTasks");
var patchCompletedTask_1 = require("../controllers/households.controllers/patchCompletedTask");
var removeTaskByTaskId_1 = require("../controllers/households.controllers/removeTaskByTaskId");
var postNewTask_1 = require("../controllers/households.controllers/postNewTask");
var getAllHouseholdUsers_1 = require("../controllers/households.controllers/getAllHouseholdUsers");
var removeUserFromHousehold_1 = require("../controllers/households.controllers/removeUserFromHousehold");
var householdsRouter = express.Router();
householdsRouter
    .route("/:household_id/authentication")
    .post(postNewUserToHousehold_1.postNewUserToHousehold);
householdsRouter.route("/:household_id").patch(patchHouseholdUsers_1.patchHouseholdUsers);
householdsRouter.post("/", postNewHousehold_1.postNewHousehold);
householdsRouter
    .route("/:household_id/tasks")
    .get(getAllTasks_1.getAllTasks)
    .patch(patchCompletedTask_1.patchCompletedTask)
    .delete(removeTaskByTaskId_1.removeTaskByTaskId)
    .post(postNewTask_1.postNewTask);
householdsRouter.get("/:household_id/users", getAllHouseholdUsers_1.getAllHouseholdUsers);
householdsRouter.delete("/:household_id/users/:user_id", removeUserFromHousehold_1.removeUserFromHousehold);
module.exports = householdsRouter;
//# sourceMappingURL=households.routers.js.map