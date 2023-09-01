const { Router } = require('express')
const { register, login, getAllUsers } = require('../service/userService.js')
// const { body } = require('express-validator')

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/allusers', getAllUsers);

module.exports = userRouter 