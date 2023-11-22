//register

const { JsonWebTokenError } = require("jsonwebtoken");
const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken")
// const user = require('../Models/userSchema')
exports.register= async(req,res)=>{
    console.log('inside refister constroler function');
    const {username,email,password}= req.body
    console.log(username,email,password)
  try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exist !! please Login")
    }else{
        const newUser = new users({
        username:username,email,password,github:"",linkedin:"",profile:""});
        await newUser.save()
        res.status(200).json(newUser)
    }
  }
  catch(err){
    res.status(401).json(`register API failed ,error:${err}`)
  }
}



exports.login=async (req,res)=>{
  console.log("inside login function")
  const {email,password}=req.body
try{
  const existingUser = await users.findOne({email,password})
  if(existingUser){
    console.log(existingUser)
    const token= jwt.sign({userId:existingUser._id},"supersecretkey12345")
    console.log(token)
    res.status(200).json({
      
      existingUser,token
    })

  }else{
    res.status(404).json(`Incorrect Email / Password`)
  }
}catch(err){
  res.status(401).json(`Login API Faild , Error ${err}`)
}
}