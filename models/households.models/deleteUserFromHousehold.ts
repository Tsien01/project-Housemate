import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";


export async function deleteUserFromHousehold (user_email) {
    
    const householdModel = db.model("household", householdObjectSchema)
    let household = await householdModel.find({ "users.email": user_email })
    //currently needs additional checks if user is admin or if user is removing themselves
    if (household[0].users.length !== 1) {
        household[0].users = household[0].users.filter((user) => {
            return user.email !== user_email
        })
        return await household[0].save()
    }
    
    else {
        const deleteCount = await householdModel.deleteOne({ "users.email": user_email })
        return deleteCount
    }
}