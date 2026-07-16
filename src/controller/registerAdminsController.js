import nodemailer  from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import adminModel from "../models/admins.js"
import {config} from "../../config.js"

const registerAdminController = {}

registerAdminController.register = async (req, res) =>{
    const {name, email, password, isVerified, loginAttempts, timeOut}= req.body

    try {
        const exitsAdmin = await adminModel.findOne({email})
        if(exitsAdmin){
            return res.status(400).json({message: "la cuenta ya existe"})
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {name, email, password, isVerified, loginAttempts, timeOut, verificationCode, passwordHash},
            config.JWT.secret,
            {expiresIn: "15m"}
        )
        res.cookie("verificationToken", tokenCode, {maxAge: 15*60*1000})
        const trasnporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Codigo de verifiacion",
            text: "Para poder verficar su cuenta ingrese el siguiente codigo " + verificationCode + " expira en 15 minutos"
        }

        trasnporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error)
                return res.status(500).json({message: "Internal server error "})
            }
            return res.status(200).json({message: "Correo enviado"})
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

registerAdminController.verifyCode = async (req, res)=>{
    try {
        const {verificationCodeRequest} = req.body
        const token  = req.cookies.verificationToken
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const { name, verificationCode: storedCode, email, passwordHash, isVerified, loginAttempts, timeOut} = decoded

        if(verificationCodeRequest!== storedCode) {
            return res.status(400).json({message: "Codigo invalido"})
        }
        const newAdmin = new adminModel({
            name, email, password: passwordHash, isVerified: true, loginAttempts, timeOut
        })
        await newAdmin.save()
        const admin = await adminModel.findOne({email})
        admin.isVerified = true
        await admin.save()
        res.clearCookie("verificationToken")
        res.json({message: "Cuenta verificada con exito"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

export default registerAdminController