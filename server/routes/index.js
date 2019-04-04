const router = require('express').Router()
const userRouter = require('./users')
const { userController } = require('../controllers')

router.post('/google-login', userController.googleLogin)
router.use('/users', userRouter)

module.exports = router