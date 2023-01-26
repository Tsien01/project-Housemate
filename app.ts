// import cors from "cors"
const express = require("express")
const app = express()
const usersRouter = require("./routers/users.routers")
const householdsRouter = require("./routers/households.routers")

import { handleErrors } from "./controllers/errors.controllers"

// app.use(cors())

app.use("/api/users", usersRouter)
app.use("/api/households", householdsRouter)

app.use(handleErrors)

module.exports = app