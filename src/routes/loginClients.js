import express from "express"
import loginClientController from "../controller/loginClientsController"

const router = express.Router()
router.route("/").post(loginClientController.login)

export default router