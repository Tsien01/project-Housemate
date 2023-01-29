import { markTaskCompleted } from "../../models/households.models/markTaskCompleted";

export function patchCompletedTask (req, res, next) {
    markTaskCompleted(req.body)
        .then((updatedHousehold) => {
            res.status(200).send({ household: updatedHousehold })
        })
        .catch((err) => {
            next(err)
        })
}