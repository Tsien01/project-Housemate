import { db } from "../../db/connection"
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema"


export async function deleteTaskByTaskId (taskBody) {
    const connection = await db
    
    const householdModel = connection.model("household", householdObjectSchema)

    let household = await householdModel.find({ "users.email": taskBody.email })
    
    if (household.length === 0) {
        return Promise.reject({
            message: "404 Not found",
            status: 404,
        })
    }

    household[0].tasks = household[0].tasks.filter((task) => {
        if (task.email === taskBody.email && task.title === taskBody.title && task.created_at===taskBody.created_at && task.task_value===taskBody.task_value) {
            return false
        }
        else return true
    })

    return await household[0].save()
    
}