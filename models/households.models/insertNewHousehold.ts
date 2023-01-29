import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";
import { insertNewUser } from "../../models/users.models";

export async function insertNewHousehold({email, userName, password, household_name, household_password}) {  
    const dbHouseholdModel = await db.model("household", householdObjectSchema);
    
    // find if user exists in a household already:
    const checkIfUserAlreadyHasHousehold = await dbHouseholdModel.find({"users.email": email})
    if (checkIfUserAlreadyHasHousehold.length !== 0) {
        return Promise.reject({
            message: "401 Unauthorised",
            status: 401,
        })
    }
    
    // create household with new user
    const newHousehold = await dbHouseholdModel.create({
        name: household_name,
        // *** we need to generate a new and unique household password internally for new households
        household_password: household_password,
        description: "Write a description",
        users: [{
            permissions: ["admin"],
            currScore: 0,
            name: userName,
            picture: "upload picture",
            email: email,
        }],
        tasks: [],
        currWinner: email
    })
    
    
    // *** we need to add the email and hashed password of the user who created the household to the login register

    if (password !== undefined) {
        insertNewUser(email, password)
    }
    
    // *** we need to return the new household object to the controller as well as the email of the user who created it
    return newHousehold

}