import express from "express"
import loginAdminController from "./src/routes/loginAdmin.js"
import loginClientController from "./src/routes/loginClients.js"

import logout from "./src/routes/logout.js"

import registerAdminController from "./src/routes/registerAdmin.js"
import registerClientsController from "./src/routes/registerClients.js"

import ticketsController from "./src/routes/tickets.js"

import wompiController from "./src/routes/wompi.js"

import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(cookieParser()); app.use(express.json())

app.use("/api/loginAdmin", loginAdminController)
app.use("/api/loginClient", loginClientController)
app.use("/api/logout", logout)
app.use("/api/registerAdmin", registerAdminController)
app.use("/api/registerClients", registerClientsController)
app.use("/api/tickets", ticketsController)
app.use ("/api/wompi", wompiController)

export default app