import { insertNewHousehold } from "../../models/households.models/insertNewHousehold"

export function postNewHousehold (req, res, next) {
    insertNewHousehold(req.body).then((household)=>{
        res.status(200).send({household})
    }).catch((err)=>{next(err)})
}
