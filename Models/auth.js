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
    },
    role:{
        type:String,
        enum : ['user','admin'],
        default: 'user'
    }
})

const registermodel = mongoose.model('authmodel',ticketschema)
module.exports = registermodel