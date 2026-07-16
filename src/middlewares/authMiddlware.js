import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next)=>{
        try{
            const {authCookie} = req.cookies

            if(!authCookie){
                return res.status(403).json({message: "Cookie no encontrada, autorización denegada"})
            }
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret)

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Acceso denegado"})
            }
            next()
        }catch(error){
            console.log(error)
            return res.status(500).json({message: "Internal server error"})
        }
    }
}