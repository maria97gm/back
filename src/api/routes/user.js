const { uploadCV } = require('../../middlewares/file')
const { isAdmin } = require('../../middlewares/isAdmin')
const { isAuth } = require('../../middlewares/isAuth')
const {
  getUsers,
  login,
  register,
  updateUserCV,
  deleteUser,
  updateUserCastings,
  deleteUserCasting,
  getUserCastings
} = require('../controllers/user')

const userRoutes = require('express').Router()
userRoutes.post('/register', register)
userRoutes.get('/', [isAuth], getUsers)
userRoutes.get('/mis-castings', [isAuth], getUserCastings)
userRoutes.post('/login', login)
userRoutes.delete('/:id', [isAuth], deleteUser)
userRoutes.delete('/:id/:castingId', deleteUserCasting)
userRoutes.put('/:id/castings', updateUserCastings)
userRoutes.put('/:id', [isAuth], uploadCV.single('photo'), updateUserCV)

userRoutes.get('/verify-token', [isAuth], (req, res) => {
  res.status(200).json({ message: 'Token válido' })
})

module.exports = userRoutes
