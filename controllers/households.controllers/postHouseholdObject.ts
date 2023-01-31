import { findHouseholdObject} from "../../models/households.models/findHouseholdObject"; 

export function postHouseholdObject(req, res, next){
    const reqObj = {email: req.body.email, household_name: req.params.household_id}
    findHouseholdObject(reqObj).then((data)=>{        
        res.status(200).send(data)
    }).catch((err)=>{next(err)})
}