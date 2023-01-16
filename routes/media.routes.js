const express= require('express')
const mediaRouter =express.Router()
const {mediaModel} =require("../models/media.model")


mediaRouter.get("/get",(req,res)=>{
    try{
     const data =mediaModel.find();
     res.send(data)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
mediaRouter.post("/create",async(req,res)=>{
    const payload =req.body;
    try{
       const notes =new mediaModel(payload)
       await notes.save()
       res.send("Created the note")
    }catch(err){
     console.log(err)
     res.send({"msg":"soething went wrong"})
    }
})


mediaRouter.patch("/update/:id",async(req,res)=>{
   const payload =req.body;
     const id =req.params.id;
  const userId =req.body.userId;
  const note =await mediaModel.findOne({"_id":id})
  try{
    if(note.userId !== userId){
      return res.send("You are not authorised to do it")
  }else{
  const data =  await mediaModel.findByIdAndUpdate({"_id":id},payload)
    return res.send("updated")
    console.log(data)
  }
  }catch(err){
    res.send("err")
    console.log({"err":"something went wrong"})
  }
})


mediaRouter.delete("/update/:id",async(req,res)=>{
      const id =req.params.id;
   const userId =req.body.userId;
   const note =await mediaModel.findOne({"_id":id})
   try{
     if(note.userId !== userId){
       return res.send("You are not authorised to do it")
   }else{
   const data =  await mediaModel.findByIdAndDelete({"_id":id})
     return res.send("deleted")
     console.log(data)
   }
   }catch(err){
     res.send("err")
     console.log({"err":"something went wrong"})
   }
 })
 
 module.exports ={mediaRouter}
