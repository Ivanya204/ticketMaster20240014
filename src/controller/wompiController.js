import fetch from "node-fetch"
import {config} from "../../config.js"

const wompiController ={}

wompiController.generarToken = async (req, res) =>{
    try {
        const response = await fetch ("https://id.wompi.sv/connect/token", {
            method: "POST",
            headers:{ "Content-Type": "application/x-www-form-urlencoded",},
            body: new URLSearchParams({
                grant_type: config.wompi.grant_type,
                audience: config.wompi.audience,
                client_id: config.wompi.client_id,
                client_secret: config.wompi.client_secret
            })
        })
        if(!response.ok){
            const error = await response.text()
            return res.status(500).json({message: "Internal server error"})
        }
        const data = await response.json()
        return res.status(200).json({message:"Generacion de token exitoso"+ data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

wompiController.paymentTest = async (req, res) =>{
    try {
        const {token, formData} = req.body
        const response = await fetch("https://id.wompi.sv/connect/TransaccionCompra/TokenizadaSin3DS",{
            method: "POST",
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
            body: JSON.stringify(formData),
        },
        )
        if(!response.ok){
            const error = await response.text()
            return res.status(500).json({message: "Internal server error"})
        }
        const data = await response.json()
        return res.status(200).json({message:"Pago exitoso"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

export default wompiController