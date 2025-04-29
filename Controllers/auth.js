
const registermodel = require('../Models/auth')
const Authservice = require('../services/auth')
const ticketcreationmodel = require('../Models/ticket')
const cohereclient = require('cohere-ai')
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
       response.user = user
       response.redirect('home')
    }
}

async function createtickets(request,response){
  const {title,description} = request.body
  const userid = request.user._id
   const client = new cohereclient.CohereClient({
    token : 'eupxDRJ7PQZ7CuFgKFDvqFZf9PZJJUO6iYXj2rzH'
   })
 const priority =await client.classify({
    model: "f8ab45a6-b178-4eac-a39d-deb070e11d1d-ft",  // <- make sure this is correct and deployed
  inputs: [
      description
  ],
  examples: [
    {
      text: "My app crashes every time I try to open it.",
      label: "High Priority"
    },
    {
      text: "Our entire system is down and no users can log in. We need immediate support!",
      label: "High Priority"
    },
    {
      text: "I forgot my password and the reset link is not working. I can't access my account.",
      label: "Account Issue"
    },
    {
      text: "My account has been locked out after multiple login attempts. Please help restore access.",
      label: "Account Issue"
    }
  ]
});
  await ticketcreationmodel.create({
    userid : userid,
    title : title,
    description : description,
    priority : priority.classifications[0].prediction
  }).then(() => {
     response.redirect('Tickets')
      console.log("Ticket Created")
  })
  
}


async function Getticket(req,res){
  const tickets = await ticketcreationmodel.find({userid: req.user._id})
  res.render('Tickets',{tickets});
}


async function GetticketsforAdmin(req,res){
  const tickets = await ticketcreationmodel.find({})
  res.render('admin',{tickets})
}


module.exports = {
    redirectlogin,
    redirectregister,
    handleregistration,
    redirecthome,
    handlogin,
    createtickets,
    Getticket,
    GetticketsforAdmin,
}