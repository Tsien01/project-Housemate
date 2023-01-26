import { markTaskCompleted } from "../../models/households.models/markTaskCompleted";

export function patchCompletedTask (req, res, next) {
    markTaskCompleted(req)
}