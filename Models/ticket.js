const mongoose = require('mongoose')

const ticketschema = new mongoose.Schema({
     userid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
     },
     title: {
        type: "String",
        require: true
     },
     description: {
        type: "String",
        required:true
     },
     priority : {
        type: "String",
        required: true
     }

})

const ticketcreationmodel = mongoose.model('ticketmodel',ticketschema)
module.exports = ticketcreationmodel