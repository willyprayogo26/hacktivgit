const router = require('express').Router()
const userRouter = require('./users')
const { UserController } = require('../controllers')
const { isLogin } = require('../middlewares')

router.post('/google-login', UserController.googleLogin)

router.use(isLogin)
router.use('/users', userRouter)

module.exports = router