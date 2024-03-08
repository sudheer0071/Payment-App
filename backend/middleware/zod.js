const zod = require('zod') 

const signupSchema = zod.object({
  username:zod.string(),
  firstname:zod.string(),
  lastname:zod.string(),
  password:zod.string().min(4)
})
  
const signinSchema = zod.object({
  username:zod.string(), 
  password:zod.string().min(4)
})
  
const updateBody = zod.object({
   password:zod.string().min(5).optional(),
   firstname:zod.string().optional(),
   lastname:zod.string().optional()
})
module.exports = {
  signinSchema, signupSchema, updateBody
}