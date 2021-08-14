const express = require('express')
const courseRouter = require('./courses')
const studentRouter = require('./students')
const userRouter = require('./users')
const authRouter = require('./auth')
const authGuard = require('../middlewares/authGuard')
const router = express.Router()

router.use('/students', studentRouter)
router.use('/courses', authGuard, courseRouter)
router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router;