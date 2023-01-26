import { deleteTaskByTaskId } from "../../models/households.models/deleteTaskByTaskId";

export function removeTaskByTaskId (req, res, next) {
    deleteTaskByTaskId(req, req)
}