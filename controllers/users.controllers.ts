const { selectUserByEmail, insertNewUser, authenticateUserLogin } = require("../models/users.models")

exports.getUserByEmail = (req, res, next) =>{
    
    selectUserByEmail(req.params.user_email).then((user)=>{
        res.status(200).send({ user })
    }).catch((err) => {next(err)})
}

exports.logInUser = (req, res, next) => { 
    authenticateUserLogin(req.body).then((household)=>{
        
        res.status(200).send(household)
    })
}

exports.postNewUser = (req, res, next) => {
    insertNewUser(req)
}