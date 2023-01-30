import { insertNewHousehold } from "../../models/households.models/insertNewHousehold"
const utils = require("../../utils/utils");

export function postNewHousehold (req, res, next) {
    req.body.household_password = utils.generateHHPassword()
    insertNewHousehold(req.body).then((household)=>{
        res.status(200).send({household})
    }).catch((err)=>{next(err)})
}
