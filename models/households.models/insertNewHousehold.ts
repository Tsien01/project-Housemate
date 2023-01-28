import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";

export async function insertNewHousehold({email, userName, household_name, household_password}) {
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
    return newHousehold

}