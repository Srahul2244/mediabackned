const express= require("express")
const app =express()
const {connection} =require('./config/db')
const {userRouter}=require("./routes/user.routes")
var cors = require('cors')
require('dotenv').config()
const {mediaRouter} =require("./routes/media.routes")
const {validator} =require("./middleware/validator.middleware")
app.use(express.json())
app.use(cors())


app.use(express.json())
app.use("/user",userRouter)
app.use(validator)
app.use("/media",mediaRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`port runing mine at ${process.env.port}`)
        console.log("connected to db") 
    }catch(err){
        console.log(err)
        console.log("trouble in connected to db")
    }
  
})