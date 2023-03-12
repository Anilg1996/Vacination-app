const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route.js")
const app = express()

app.use(express.json())
app.use("/",route)
mongoose.set("strictQuery",true)

mongoose.connect("mongodb+srv://Lucifer:lucifer123@cluster1.578aivq.mongodb.net/anildb?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log("MongoDb is connected"))
.catch((err)=>console.log(err))

app.listen(3000, function () {
    console.log("Port connected to 3000")
 })