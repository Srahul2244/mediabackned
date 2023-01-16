
const mongoose =require("mongoose")

const mediaSchema =mongoose.Schema({
    title : String,
    body : String,
    device : String,
    userId :String
})

const mediaModel =mongoose.model('media',mediaSchema)

module.exports ={mediaModel}