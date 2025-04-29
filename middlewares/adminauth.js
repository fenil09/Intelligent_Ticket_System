

function checkloginforadmin(req,res,next){
  const userid= req.use
  next()
}

module.exports = checkloginforadmin