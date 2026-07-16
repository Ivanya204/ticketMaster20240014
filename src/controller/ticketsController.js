import ticketsModel from "../models/tickets.js"
const ticketsController = {}

ticketsController.getTickets = async (req, res) =>{
    try {
        const ticket = await ticketsModel.find()
        return res.status(200).json(ticket)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

ticketsController.postTicket = async (req, res) =>{
    try {
        let {quantity, purchaseDate, total, paymentStatus, customerId, transactionId} = req.body
        const newTicket = new ticketsModel({quantity, purchaseDate, total, paymentStatus, customerId, transactionId})
        await newTicket.save()
        return res.status(201).json({message : "ticket save"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

ticketsController.putTicket = async (req, res) =>{
    try {
        let {quantity, purchaseDate, total, paymentStatus, customerId, transactionId} = req.body
        const updated = await ticketsModel.findByIdAndUpdate(
            req.params.id,
            {quantity, purchaseDate, total, paymentStatus, customerId, transactionId},
            {new: true}
        )
        if(!updated){
            return res.status(404).json({message : "not found"})
        }
        return res.status(200).json({message : "ticket updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

ticketsController.deleteTicket = async (req, res) =>{
    try {
        const deleted = await ticketsModel.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message : "not found"})
        }
        return res.status(200).json({message : "ticket deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error "})
    }
}

export default ticketsController