const jwt = require("jsonwebtoken");
const secret = require('../config.js')
 
 async function authMiddleware(req, res, next){
   const authHeader = req.headers.authorization; 
   if (authHeader!=null) {
     const token = authHeader.split(' ')[1];    
     console.log(token);
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
       
       return res.json({message:"Token error in middleware"})
       
      }
      
      try { 
        const decode = jwt.verify(token, secret)
        req.userId = decode.userId    
        return next()
      } catch (error) {
        res.json({message:"Error"})
      }
    }
    }
 
module.exports = {authMiddleware}  