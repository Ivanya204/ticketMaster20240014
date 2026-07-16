import express from "express"
import ticketsController from "../controller/ticketsController.js"

import { validateAuthCookie } from "../middlewares/authMiddlware.js"

const router = express.Router()

router.route("/")
.get(validateAuthCookie(["admin"]), ticketsController.getTickets)
.post(validateAuthCookie(["client"]), ticketsController.postTicket)

router.route("/:id")
.put(validateAuthCookie(["client", "admin"]), ticketsController.putTicket)
.delete(validateAuthCookie(["admin"]), ticketsController.deleteTicket)
export default router