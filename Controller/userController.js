//register
const users = require("../Models/userSchema");

const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")
// const user = require('../Models/userSchema')
exports.register= async(req,res)=>{
  
    const {username,email,password}= req.body
    
  try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exist !! please Login")
    }else{
        const newUser = new users({
        username,email,password,github:"",linkedin:"",profile:""})
        await newUser.save()
        res.status(200).json(newUser)
    }
  }
  catch(err){
    res.status(401).json(`register API failed ,error:${err}`)
  }
}



exports.login=async (req,res)=>{

  const {email,password}=req.body
try{
  const existingUser = await users.findOne({email,password})
  if(existingUser){
  
    const token= jwt.sign({userId:existingUser._id},"supersecretkey12345")

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

exports.editProfileController=async(req,res)=>{

  const userId=req.payload
  const {username,email,password,github,linkedin,profile}=req.body
  const uploadProfileImage=req.file?req.file.filename:profile
  try{
    const updateProfile=await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,"profile":uploadProfileImage},{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
  }catch(err){
     res.status(401).json(err)

     }
 }