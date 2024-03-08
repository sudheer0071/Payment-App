const express = require('express')
const { route } = require('./user') 
const { route1 } = require('./amount')

const router = express.Router()  


router.use('/user',route)
router.use('/account',route1)
router.get('/',(req, res)=>{
  res.send("backend is working fine for index.js route inside routes folder")
})
module.exports = {router}  


