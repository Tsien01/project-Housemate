import { insertNewTask } from "../../models/households.models/insertNewTask";

export function postNewTask (req, res, next) {    
    insertNewTask(req.body).then((updatedHousehold)=>{
        res.status(200).send({household: updatedHousehold})
    }).catch((err)=>{next(err)})
}