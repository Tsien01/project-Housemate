import { db } from "../../db/connection"
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema"


export async function deleteTaskByTaskId (taskBody) {
    const householdModel = db.model("household", householdObjectSchema)

    let household = await householdModel.find({ "users.email": taskBody.email })

    household[0].tasks = household[0].tasks.filter((task) => {
        if (task.email === taskBody.email && task.title === taskBody.title && task.created_at===taskBody.created_at && task.task_value===taskBody.task_value) {
            return false
        }
        else return true
    })

    return await household[0].save()
    
}