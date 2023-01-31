import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";

export async function findHouseholdObject({email, household_name}){
    const connection = await db;
    const dbHouseholdModel = await connection.model("household", householdObjectSchema);
    const usersHousehold = await dbHouseholdModel.find({"users.email": email})

    // ensure household name matches the household:
    if (usersHousehold[0].name !== household_name) {
        return Promise.reject({
            message: "401 Unauthorised - user isn't part of household",
            status: 401,
        })
    }
    
    return {email:email, household: usersHousehold[0]}
    
}