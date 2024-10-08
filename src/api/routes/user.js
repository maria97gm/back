const { uploadCV } = require('../../middlewares/file')
const {
  getUsers,
  login,
  register,
  updateUserCV,
  deleteUser,
  updateUserCastings,
  deleteUserCasting
} = require('../controllers/user')

const userRoutes = require('express').Router()
userRoutes.post('/register', register)
userRoutes.get('/', getUsers)
userRoutes.post('/login', login)
userRoutes.delete('/:id', deleteUser)
userRoutes.delete('/:id/:castingId', deleteUserCasting)
userRoutes.put('/:id/castings', updateUserCastings)
userRoutes.put('/:id', uploadCV.single('photo'), updateUserCV)

module.exports = userRoutes
