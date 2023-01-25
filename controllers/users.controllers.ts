const {selectUserById} = require("../models/users.models")


exports.getUserById = (req, res, next) =>{
    
    selectUserById(req.params.user_id).then((user)=>{
        console.log(user, "user in controller");
        res.status(200).send({ user })
    }).catch((err)=>{
        console.log(err, "err in controller");
        // next()
    })
}