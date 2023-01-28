import { insertNewUserToHousehold } from "../../models/households.models/insertNewUserToHousehold"

export const postNewUserToHousehold = (req, res, next) => {
    insertNewUserToHousehold(req)
} 

// isn't this covered by the patchHouseholdUsers and postNewHousehold end points?
// we agreed that households can't be created without a user and the last user leaving a household deletes it
// should we delete this file?
// comments by Adrian
