const express = require('express')  
const jwt = require('jsonwebtoken')
const secret = require('../config.js') 
const route = express.Router()
const {User, Acount} = require('../db/index.js')  
const { signinSchema, signupSchema, updateBody } = require('../middleware/zod.js') 
const { authMiddleware } = require('../middleware/middleware.js')
 
route.get('/me',authMiddleware, async (req,res)=>{
   if (req.userId==null) {
   return res.json({message:'User is not signed in'})
   }
   else{

     const user = await User.findOne({_id:req.userId})
     console.log(user.firstname);
     res.json({message:"User is logged in",firstname:user.firstname})
   }
})

route.post('/signUp',async (req,res) =>{ 
    const createpayload = req.body;
    const zodVerify = signupSchema.safeParse(createpayload)  
    const alaready = await User.findOne({username:createpayload.username}) 
    if (!zodVerify.success) {
      return res.json({message:"Password must be more than 6 characters"})
    }
    if(alaready){
      return res.json({message:"Username already exist try different one"})
    }
   
    const user = await User.create(createpayload) 
    const token = jwt.sign({userId:user._id}, secret)
    const userId = user._id
    console.log(userId);
    Acount.create({
      userId, 
      balance: 1*Math.random() * 10000
    })
    // will save token in databse
    res.json({message:"User created sucessfully!", token:token}) 

})  

route.post('/signIn',async (req,res) =>{  
  const createpayload = req.body;
  const zodVerify = signinSchema.safeParse(createpayload)  
  const userexist = await User.findOne({username:createpayload.username})
  const user = await User.findOne({username:createpayload.username, password:createpayload.password}) 
  if(!userexist){
    return res.json({message:"User doesn't exist"})
  } 
else{ 

  if (!zodVerify.success) {
    return res.send("zod error")
  }
  
 if (!user) {
      return res.json({message:"Invalid Credentails"}) 
    }
    else{
    
      // will save token in database
      const token = jwt.sign({userId:user._id}, secret)
      res.json({message:"Fetching details....", token:token, firstname:user.firstname})
    } 
} 
}) 
 
route.post('/check', authMiddleware , async(req, res)=>{ 
  res.json({message:"check done!",userId:req.userId})
}) 

route.put('/',authMiddleware, async (req,res) => {  
   const { success } =  updateBody.safeParse(req.body)
   if (!success) {
     return res.status(411).json({message:"Error while updating information"})
   } 

   await User.updateOne({_id:req.userId}, req.body)

   res.json({message:"updated successfully!!"})
})  
 
route.get('/bulk', async (req,res)=>{
  const filter = req.query.filter || ""
  const users = await User.find({
    $or:[
     { firstname:{'$regex':filter}},
     { lastname:{'$regex':filter}}
    ]
  })
    res.json({
    user: users.map((user)=>({
      username:user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      _id:user._id
    }))
   }) 
})
module.exports = { 
  route 
}   