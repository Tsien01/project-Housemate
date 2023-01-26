import { insertNewHousehold } from "../../models/households.models/insertNewHousehold"

export function postNewHousehold (req, res, next) {
    insertNewHousehold(req)
}