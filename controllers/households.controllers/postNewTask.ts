import { insertNewTask } from "../../models/households.models/insertNewTask";

export function postNewTask (req, res, next) {
    insertNewTask(req)
}