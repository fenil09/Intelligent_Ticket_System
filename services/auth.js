


const jwt = require('jsonwebtoken')
const secret = "fenil09"

function setuser(user){
    const payload = {
        _id: user._id,
        email : user.email,
        role: user.role
    }
    return jwt.sign(payload,secret)
}

function getuser(token){
    return jwt.verify(token,secret)
}

module.exports ={
    setuser,
    getuser
}