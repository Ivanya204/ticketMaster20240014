import express from "express"
import loginAdminController from "./src/controller/loginAdminsController.js"
import loginClientController from "./src/controller/loginClientsController.js"

import logout from "./src/controller/logout.js"

import registerAdminController from "./src/controller/registerAdminsController.js"
import registerClientsController from "./src/controller/registerClientsController.js"

import ticketsController from "./src/controller/ticketsController.js"

import wompiController from "./src/controller/wompiController.js"

import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(cookieParser); app.use(express.json())

app.use("/api/loginAdmin", loginAdminController)
app.use("/api/loginClient", loginClientController)
app.use("/api/logout", logout)
app.use("/api/registerAdmin", registerAdminController)
app.use("/api/registerClients", registerClientsController)
app.use("/api/tickets", ticketsController)
app.use ("/api/wompi", wompiController)

export default app