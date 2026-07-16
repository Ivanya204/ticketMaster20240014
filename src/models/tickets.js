import mongoose, {Schema, model} from "mongoose";

const ticketsSchema = new Schema({
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: String},
    paymentStatus: {type: Boolean},
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "Clients"},
    transactionId: {type: String}
},
{
    timestamps: true,
    strict: false
})

export default model ("Clients", clientsSchema)