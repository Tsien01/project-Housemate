import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";


export async function markTaskCompleted (taskBody) {
    const connection = await db; 

    const householdModel = connection.model("household", householdObjectSchema)

    let household = await householdModel.find({ "users.email": taskBody.email })
    
    household[0].tasks.forEach((task) => {
        if (task.email === taskBody.email && task.title === taskBody.title && task.created_at===taskBody.created_at && task.task_value===taskBody.task_value) {
            task.completion = true
        }
    })

    await household[0].save()
    
    return household[0]
    
    
}