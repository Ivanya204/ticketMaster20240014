import express from "express"
import loginAdminController from "../controller/loginAdminsController.js"

const router = express.Router()
router.route("/").post(loginAdminController.login)

export default router