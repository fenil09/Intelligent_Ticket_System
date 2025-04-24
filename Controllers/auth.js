
const registermodel = require('../Models/auth')
const Authservice = require('../services/auth')
function redirectlogin(req,res){
    res.render('login')
}
function redirectregister(req, res){
    res.render('register')
}
function redirecthome(req,res){
    res.render('home')
}

function handleregistration(request,response){
    const body = request.body
    registermodel.create({
        name: body.name,
        email: body.email,
        password: body.password
    }).then(()=>{
        response.redirect('home')
    })
}


async function handlogin(request,response){
    const {email,password} = request.body
    const user = await registermodel.findOne({email,password})
    if(!user){
       response.render('register')
    }
    else{
       const token = Authservice.setuser(user)
       response.cookie('uid',token)
       response.redirect('home')
    }
}


module.exports = {
    redirectlogin,
    redirectregister,
    handleregistration,
    redirecthome,
    handlogin
}