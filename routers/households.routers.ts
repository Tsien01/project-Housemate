import * as express from "express";
import { postNewUserToHousehold } from "../controllers/households.controllers/postNewUserToHousehold";
import { postNewHousehold } from "../controllers/households.controllers/postNewHousehold";
import { patchHouseholdUsers } from "../controllers/households.controllers/patchHouseholdUsers";
import { getAllTasks } from "../controllers/households.controllers/getAllTasks";
import { patchCompletedTask } from "../controllers/households.controllers/patchCompletedTask";
import { removeTaskByTaskId } from "../controllers/households.controllers/removeTaskByTaskId";
import { postNewTask } from "../controllers/households.controllers/postNewTask";
import { getAllHouseholdUsers } from "../controllers/households.controllers/getAllHouseholdUsers";
import { removeUserFromHousehold } from "../controllers/households.controllers/removeUserFromHousehold";

const householdsRouter = express.Router();

householdsRouter
  .route("/:household_id/authentication")
  .post(postNewUserToHousehold);

householdsRouter.route("/:household_id").patch(patchHouseholdUsers);

householdsRouter.post("/", postNewHousehold);

householdsRouter
  .route("/:household_id/tasks")
  .get(getAllTasks)
  .patch(patchCompletedTask)
  .delete(removeTaskByTaskId)
  .post(postNewTask);

householdsRouter.get("/:household_id/users", getAllHouseholdUsers);

householdsRouter.delete(
  "/users/:user_email",
  removeUserFromHousehold
);

module.exports = householdsRouter;
