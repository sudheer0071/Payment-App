const express = require('express') 
const { Acount } = require('../db')
const { authMiddleware } = require('../middleware/middleware')
const { default: mongoose } = require('mongoose')

const route1 = express.Router()

route1.get('/balance', authMiddleware, async (req, res) => {
  console.log(req.userId);
  const acount = await Acount.findOne({
    userId: req.userId
  })
  res.json({ message: acount.balance })
}) 

//******************************** bad solution ********************************
// route1.post('/transfer', authMiddleware, async (req, res) => {
//   const { amount, to } = req.body


//   const account = await Acount.findOne({
//     userId: req.userId
//   })
//   console.log(account.balance);
//   if (account.balance < amount) {
//     return res.status(400).json({ message: "Insufficient balance" })
//   }

//   const toAccount = await Acount.findOne({
//     userId: to
//   })

//   if (!toAccount) {
//     return res.json({ message: "Invalid account" })
//   }

//   const updatedbal = await Acount.updateOne({
//     userId: to
//   }, { $inc: { balance: amount } })
 

//   await Acount.updateOne({
//     userId: req.userId
//   },{$inc: { balance:-amount}})

//   res.json({ message: "Transaction successfull!" })
 
// })

// ******************************** Good solution ********************************
route1.post('/transfer', authMiddleware, async (req, res) => {
  const { amount, to } = req.body
  const session = await mongoose.startSession()

  session.startTransaction()
  
  const account = await Acount.findOne({
    userId: req.userId
  }).session(session)
  console.log(account.balance);
  if (!account||account.balance < amount) {
    await session.abortTransaction();
    return res.json({ message: "Insufficient balance :/" })
  }

  const toAccount = await Acount.findOne({
    userId: to
  }).session(session)

  if (!toAccount) {
    await session.abortTransaction();
    return res.json({ message: "Invalid account" })
  }

  await Acount.updateOne({
    userId: to
  }, { $inc: { balance: amount } }).session(session)
 

  await Acount.updateOne({
    userId: req.userId
  },{$inc: { balance:-amount}}).session(session)
  session.commitTransaction()

  res.json({ message: "Transaction successful!" })
 
}) 
  
// this is to check transaction is running well
// async function transfer(req) {
//   const session = await mongoose.startSession();

//   session.startTransaction();
//   const { amount, to } = req.body;

//   // Fetch the accounts within the transaction
//   const account = await Acount.findOne({ userId: req.userId }).session(session);

//   if (!account || account.balance < amount) {
//       await session.abortTransaction();
//       console.log("Insufficient balance")
//       return;
//   } 

//   const toAccount = await Acount.findOne({ userId: to }).session(session);

//   if (!toAccount) {
//       await session.abortTransaction();
//       console.log("Invalid account")
//       return;
//   }
 
//   // Perform the transfer
//   await Acount.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//   await Acount.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//   // Commit the transaction
//   await session.commitTransaction();
//   console.log("done")
// }

// transfer({
//   userId: "65e4adebf11fc69ed84689d9",
//   body: {
//       to: "65e4a791693c62e906c823e6",
//       amount: 2100
//   }
// })
 

// transfer({
//   userId: "65e4adebf11fc69ed84689d9",
//   body: {
//       to: "65e4a791693c62e906c823e6",
//       amount: 100
//   }
// })
 
route1.get('/', (req, res) => {
  res.send("backend is workng fine for amount.js route")
})

module.exports = {
  route1
}