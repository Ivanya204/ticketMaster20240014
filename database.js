import mongoose from "mongoose"
import {config} from "./config.js"

mongoose.connect(config.db.URI)
const connection = mongoose.connection

connection.once("open", () =>{
    console.log("BD is connected")
})

connection.on("disconnected", () =>{
    console.log("BD is disconnected")
})

connection.on("error", (error)=>{
    console.log("error found" + error)
})