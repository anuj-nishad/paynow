require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('connected',()=>{
  console.log('Connected to MongoDB');
})

db.on('disconnected',()=>{
  console.log('MongoDB Disconnected');
})

db.on('error',()=>{
  console.log('Error connecting MongoDB')
})

module.exports = db;