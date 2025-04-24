const mongoose = require('mongoose')

let setupconnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Ticket-Backend').then(()=>{
        console.log('MongoDB connection established')
    })
}

module.exports = setupconnection