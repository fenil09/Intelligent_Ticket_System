const mongoose = require('mongoose')

const ticketschema = new mongoose.Schema({
    name:{
        type: "String",
        require : "true"
    },
    email:{
        type: "String",
        require: "true"
    },
    password: {
        type:"String",
        require:"true"
    }
})

const registermodel = mongoose.model('authmodel',ticketschema)
module.exports = registermodel