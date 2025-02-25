const express = require('express');
const router = express.Router();

const userRouter = require('./user')
const accountRouter = require('./account')
const meRouter = require('./me')

router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/me', meRouter )

module.exports = router;