// we are gonna have a middlware thats gonna check if the token is 
// good or not, else its not gonna let the user through in the 
// case of refreshes.


const Authservice = require('../services/auth')
const registermodel = require('../Models/auth')
const { response } = require('../Routes/auth')
const ticketcreationmodel = require('../Models/ticket')
async function checklogin(req,res,next){
 const uid = req.cookies.uid
 if(!uid){
    return res.render('login')
 }
 else{
     const user = await Authservice.getuser(uid)
     console.log(user)
     if(!user){
      return  res.redirect('login')
     }

      if(user.role!='admin'){
        req.user = user
        next()
      }
      else{
        console.log('next being called')
       const tickets = await ticketcreationmodel.find({})
       res.render('admin',{tickets})
      }
  
 }
}

module.exports = checklogin