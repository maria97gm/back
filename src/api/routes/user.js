const { getUsers, login, register } = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.post('/register', register)
userRoutes.get('/', getUsers)
userRoutes.post('/login', login)

module.exports = userRoutes
