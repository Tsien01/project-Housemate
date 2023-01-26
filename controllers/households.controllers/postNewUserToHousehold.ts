import { insertNewUserToHousehold } from "../../models/households.models/insertNewUserToHousehold"

export const postNewUserToHousehold = (req, res, next) => {
    insertNewUserToHousehold(req)
} 