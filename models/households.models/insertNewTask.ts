import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";

export async function insertNewTask ({email, created_at, deadline, title, description, completion, task_value, tags}) {

    // reject if certain fields are missing, expecting that FE will provide default values
    if (!email || !created_at || !deadline || !title || !task_value){
        return Promise.reject({
            message: "400 Bad Request",
            status: 400,
        })
    }
     if (typeof tags.length !== "number") {
        return Promise.reject({
            message: "400 Bad Request",
            status: 400,
        })
     }
    
    const dbHouseholdModel = await db.model("household", householdObjectSchema);
    const usersHouseholdDoc = await dbHouseholdModel.find({"users.email": email})

    // ensure title is unique
    const currTasks = usersHouseholdDoc[0].tasks
    const isUnique = currTasks.filter((task)=>{       
        return task.title === title
    })
    if (isUnique.length > 0){
        return Promise.reject({
            message: "400 Bad request - task title already exists and must be unique",
            status: 400,
        })
    }
    
    // create new task and post it to the household

    const newTask = {
        email: email,
        created_at: created_at,
        deadline: deadline,
        title: title,
        description: description,
        completion: completion,
        task_value: task_value,
        tags: tags
    }
    const updateQuery = { $push: { tasks: newTask } };
    const updateOptions = { new: true };
    const updatedHouseholdDoc = await dbHouseholdModel.findOneAndUpdate({"users.email": email}, updateQuery, updateOptions);
    
    return updatedHouseholdDoc;
    
}