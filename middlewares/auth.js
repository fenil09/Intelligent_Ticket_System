// we are gonna have a middlware thats gonna check if the token is 
// good or not, else its not gonna let the user through in the 
// case of refreshes.


const Authservice = require('../services/auth')
async function checklogin(req,res,next){
 const uid = req.cookies.uid
 if(!uid){
    res.render('login')
 }
 else{
     const user = await Authservice.getuser(uid)
     if(!user){
        return res.render('login')
     }
     else{
        res.render('home')
     }
 }
}

module.exports = checklogin