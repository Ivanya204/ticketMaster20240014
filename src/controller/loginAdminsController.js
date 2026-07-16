import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

import adminModel from "../models/admins.js"
import {config}  from "../../config.js"

const loginAdminController  = {}
loginAdminController.login = async (req, res) =>{
    try {
        const {email, password} = req.body
        const userFound = await adminModel.findOne({email})

        if(!userFound){
            return res.status(404).json({message : "not found"})
        }
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message : "cuenta bloqueada"})
        }

        const isMatch = await bcrypt.compare (password, userFound.password)

        if(isMatch){
            userFound.loginAttempts = (userFound.loginAttempts || 0)+1
            if(userFound.loginAttempts >= 5){
                userFound.timeOut = Date.now() +15*60*1000
                userFound.loginAttempts= 0
                await userFound.save()
                return res.status(403).json({message : "cuenta bloqueada"})
            }
            await userFound.save()
            return res.status(401).json({message : "cuenta bloqueada"})
            
        }
        userFound.loginAttempts = 0
        userFound.timeOut = null
        await userFound.save()

        const token = jsonwebtoken.sign(
            {id:userFound._id, userType: "admin"},
            config.JWT.secret,
            {expiresIn: "15d"}
        )

        res.cookue ("authCookie", token)
        return res.status(200).json({message : "Inicio de sesión exitoso"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

export default loginAdminController