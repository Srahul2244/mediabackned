const express =require("express")
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")
const {userModel} =require("../models/users.model")
require('dotenv').config()

const userRouter=express.Router()

userRouter.post("/register",(req,res)=>{
    const {email,password,name,gender} =req.body;
    try{
        bcrypt.hash(password,5,async(err,secure_pass)=>{
        if(err){
            console.log(err)
        }else{
            const user =new userModel({email,password:secure_pass,name,gender})
            await user.save()
            res.send("Registered")
        }
        })
    }catch(err){
    res.send("err happened in post request")
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    // console.log(email,password)
    try{
    const user = await userModel.find({email})
    console.log(user)
    if(user.length > 0){
    const hashed_password=user[0].password
    console.log(hashed_password)
   await bcrypt.compare(password,hashed_password,(err,result)=>{
    if(result){
        const token=jwt.sign({userId:user[0]._id},process.env.secret,{expiresIn:"1hr"})
        res.send({"msg":"Login Successful","token":token})
    }else{
        res.send("wrong crendentials")
    }
        });
    } else {
    res.send("Login Failed")
    }
    } catch(err){
    console.log(err)
    }
    })

  
    

module.exports ={userRouter}