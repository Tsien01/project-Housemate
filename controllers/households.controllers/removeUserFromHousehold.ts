import { deleteUserFromHousehold } from "../../models/households.models/deleteUserFromHousehold";

export function removeUserFromHousehold (req, res, next) {
    deleteUserFromHousehold(req.params.user_email)
        .then(() => {
            res.status(204).send()
        })
        .catch((err) => {next(err)})
}