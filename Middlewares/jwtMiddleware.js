const jwt=require('jsonwebtoken')
jwtMiddleware=(req,res,next)=>{

 const token=req.headers['authorization'].split(" ")[1]
//  console.log(token)
try{const jwtResponse=jwt.verify(token,"supersecretkey12345")

req.payload=jwtResponse.userId
next()

}catch(err){
    res.status(401).json("Authorization failed please login...")
}
}

module.exports= jwtMiddleware