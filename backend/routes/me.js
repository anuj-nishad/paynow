const express = require('express');
const { jwtAuthMiddleware } = require('../jwt');
const User = require('../models/userModel'); 

const router = express.Router()

router.get('/', jwtAuthMiddleware , async (req, res) => {
  try {
    const userId = req.userId; 
    if(!userId){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({user})
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
