import * as express from "express"
const { getUserByEmail, logInUser, postNewUser } = require("../controllers/users.controllers")

const usersRouter = express.Router()

usersRouter.route("/:user_email").get(getUserByEmail)
    
usersRouter.post("/authentication", logInUser)

usersRouter.post("/", postNewUser)

module.exports = usersRouter