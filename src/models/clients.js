import mongoose, {Schema, model} from "mongoose";

const clientsSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    isVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date}
},
{
    timestamps: true,
    strict: false
})

export default model ("Clients", clientsSchema)