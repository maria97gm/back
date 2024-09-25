const { uploadCV } = require('../../middlewares/file')
const {
  getUsers,
  login,
  register,
  updateUserCV
} = require('../controllers/user')

const userRoutes = require('express').Router()
userRoutes.post('/register', register)
userRoutes.get('/', getUsers)
userRoutes.post('/login', login)
userRoutes.put('/:id', uploadCV.single('photo'), updateUserCV)
module.exports = userRoutes
