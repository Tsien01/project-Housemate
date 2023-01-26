import { deleteUserFromHousehold } from "../../models/households.models/deleteUserFromHousehold";

export function removeUserFromHousehold (req, res, next) {
    deleteUserFromHousehold(req, req)
}