// import { updateHouseholdUsers } from "../../models/households.models/updateHouseholdUsers";

const { updateHouseholdUsers } = require("../../models/households.models/updateHouseholdUsers")

export function patchHouseholdUsers (req, res, next) {
    updateHouseholdUsers(req.body)
    
}

