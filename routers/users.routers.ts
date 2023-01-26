import * as express from "express"
const { getUserById, postNewUser } = require("../controllers/users.controllers")

const usersRouter = express.Router()

usersRouter.get("/:user_id", getUserById)

usersRouter.post("/", postNewUser)

module.exports = usersRouter