import { insertNewHousehold } from "../../models/households.models/insertNewHousehold"

export function postNewHousehold (req, res, next) {
    insertNewHousehold(req)
}



// post user to be added to new household

// checks to see if user is already part of another household
// if not part of existing household, create new household with one user with admin permissions
// Request body accepts:

// an object in the form:
// {
// user_email: <user's email>,
// name: <user's name>
// household_name: <name of household trying to join>,
// household_password: <password of household>
// }

// permissions set to member
// currScore set to 0