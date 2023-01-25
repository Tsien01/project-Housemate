// import cors from "cors"
// import express from "express"
const express = require("express")
const app=express()
// const apiRouter = require("./routers/api.routers")
const {getUserById} = require("./controllers/users.controllers")

// app.use(cors())

// app.use("/api", apiRouter)

app.get("/api/users/:user_id", getUserById)



module.exports = app