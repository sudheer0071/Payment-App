require('dotenv').config()
const express = require("express");
const { router } = require("./routes");   
const cors = require('cors')
const app = express() 

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 4000
app.use('/api/v1',router) 

app.get('/',(req,res)=>{
  res.send("backend is working fine")
})
app.listen(port,()=>{
  console.log(`server is listening on port ${port}`);
}) 
