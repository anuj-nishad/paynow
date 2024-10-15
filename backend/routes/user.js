const express = require('express');
const router = express.Router();
const zod = require('zod');
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const Account = require('../models/account');

const signupSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
  email: zod.string().email()
})

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const success = signupSchema.safeParse(body);
    if (!success.success) {
      return res.status(400).json({ message: 'Invalid request'});
    }

    const response = await new User(req.body).save();
    const payload = {
      username: response.username,
      id: response.id
    }

    //---------------Generate Random Amount in his Bank Balance

    await new Account({
      userId: response.id,
      balance: Math.round((1 + Math.random() * 1000) * 100) / 100
    }).save();

    const token = generateToken(payload);

    res.status(200).json({ msg: "New User Added Successfully", response, token: token });

  } catch (err) {
    res.status(401).json({ Error: err });
  }

})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ msg: "Incorrect Username or Password" });

    const payload = {
      username: user.username,
      id: user.id
    }
    const token = generateToken(payload);

    res.status(201).json({ msg: "Signed in Succefully", user, token })

  } catch (err) {
    res.status(401).json({ Error: err });
  }
})

router.get('/bulk', async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } }
      ]
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
      }))
    })
    
  } catch (err) {
    res.status(401).json({ Error: err });
  }
});

router.put('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, password } = req.body;

    const updatedData = { firstName, lastName, password };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user)
      return res.status(404).json({ msg: "User Not Found" });

    res.json({ msg: "User Updated Successfully", user })

  } catch (err) {
    res.status(401).json({ Error: err });
  }
})

module.exports = router;