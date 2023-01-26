import { findAllTasks } from "../../models/households.models/findAllTasks";

export function getAllTasks (req, res, next) {
    findAllTasks(req)
}