import { findAllHousehouldUsers } from "../../models/households.models/findAllHouseholdUsers";

export function getAllHouseholdUsers (req, res, next) {
    findAllHousehouldUsers(req)
}