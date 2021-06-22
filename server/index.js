const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 3000
const app=express()
app.use(express.static(path.resolve("static")))
app.get('/1.json',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"..","public","1.json"))
})
app.get(["/",(req,res)=>res.sendFile())
app.listen(PORT, ()=>console.log(`Start on ${PORT} ...`))