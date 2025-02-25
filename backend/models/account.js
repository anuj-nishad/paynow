const mongoose = require('mongoose');

const getLocalTime = () => {
  const now = new Date();
  return new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })); 
};

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  transactions: [
      {
        receiptFirstName: {
          type: String,
          required: true
        },
        receiptLastName: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        eventTime: {
          type: Date,
          default: getLocalTime
        },
        transactionType: {  
          type: String,
          enum: ['send', 'receive'], 
          required: true
        }
      }
  ]
});

const Account = mongoose.model('account', AccountSchema);

module.exports = Account;