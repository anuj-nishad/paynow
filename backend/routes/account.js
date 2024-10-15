const express = require('express');
const { jwtAuthMiddleware } = require('../jwt');
const Account = require('../models/account');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');

router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const userID = req.userId;
    const account = await Account.findOne({ userId: userID });

    res.status(201).json({ account })
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
})

router.post('/transfer', jwtAuthMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction(); //start
    const { toUserId, amount } = req.body;
    const toAmount = Math.round(amount * 100) / 100;

    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (account.balance < toAmount) {
      await session.abortTransaction();
      return res.status(401).json({ msg: "Insufficient Balance" });
    }

    const accountUser = await User.findOne({_id: req.userId}).session(session);
    if(!accountUser){
      await session.abortTransaction();
      return res.status(401).json({msg: 'User not found'})
    } 
    
    const toAccount = await Account.findOne({ userId: toUserId }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(401).json({ msg: "Account not found" });
    }

    const toAccountUser = await User.findOne({_id: toAccount.userId}).session(session);
    if(!toAccountUser){
      await session.abortTransaction();
      return res.status(401).json({msg: ' Receiver not found'})
    }  

    //Sender
    await Account.updateOne({ userId: req.userId }, { 
    $inc: { balance: -toAmount } ,
    $push: {
      transactions: {receiptFirstName: toAccountUser.firstName, receiptLastName: toAccountUser.lastName, amount: toAmount, transactionType: 'send'}
    }
    }).session(session);

    //Receiver
    await Account.updateOne({ userId: toUserId }, { 
      $inc: { balance: toAmount },
      $push:{
        transactions: {receiptFirstName: accountUser.firstName, receiptLastName: accountUser.lastName, amount: toAmount, transactionType: 'receive'}
      }
    }).session(session);

    session.commitTransaction();
    res.status(201).json({ msg: "Transfer Successful" })
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})
module.exports = router;