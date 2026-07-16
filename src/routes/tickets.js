import express from "express"
import ticketsController from "../controller/ticketsController.js"

const router = express.Router()

router.route("/")
.get(ticketsController.getTickets)
.post(ticketsController.postTicket)

router.route("/:id")
.put(ticketsController.putTicket)
.delete(ticketsController.deleteTicket)
export default router