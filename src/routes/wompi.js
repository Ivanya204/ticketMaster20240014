import express from "express"
import wompiController from "../controller/wompiController.js"

const router = express.Router()

router.route ("/generarToken")
.post(wompiController.generarToken)

router.route ("/paymentTest")
.post(wompiController.paymentTest)

export default router
