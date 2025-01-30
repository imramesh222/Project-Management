const UserModel=require('../models/userModel')
const bcrypt=require('bcrypt')

//register

exports.register=async (req,res)=>{
  let{username,email,password}=req.body

  //check if username is already registered or not
  let user=await UserModel.findOne({username})
  if(user){
    return res.status(400).json({error:"Username not available"})
  }
  user=await UserModel.findOne({email})
  if(user){
    return res.status(400).json({error:"Email already taken"})
  }

  //encypt password
  let hased_password=await bcrypt.hash(password,10)

  user=await UserModel.create({
    username,
    email,
    password
  })
  if(!user){
    return res.status(400).json({error:"Something went wrong."})
  }
  res.send({message:"User registered succesfully.",user})
}