import express from "express"
import logout from "../controller/logout.js"
import logoutController from "../controller/logout.js"

const router = express.Router()
router.route("/").post(logoutController.logout)

export default router