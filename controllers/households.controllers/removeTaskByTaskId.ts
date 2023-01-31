import { deleteTaskByTaskId } from "../../models/households.models/deleteTaskByTaskId";

export function removeTaskByTaskId (req, res, next) {
    console.log(req.body, "I'm the removeTaskByTaskID controller");
    
    deleteTaskByTaskId(req.body)
        .then(() => {
            res.status(204).send()
        })
        .catch((err) => {
            next(err)
        })
}