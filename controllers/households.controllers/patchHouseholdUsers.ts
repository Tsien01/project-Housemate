const { updateHouseholdUsers } = require("../../models/households.models/updateHouseholdUsers")

export function patchHouseholdUsers (req, res, next) {
    updateHouseholdUsers(req.body).then((household ) => {
        res.status(200).send( { household })
    }).catch((err) => {next(err)})
}