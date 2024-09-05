const { generateSign } = require('../../config/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(404).json('No hemos podido acceder a los usuarios')
  }
}

const register = async (req, res, next) => {
  try {
    const user = new User(req.body)
    const userDuplicated = await User.findOne({ userName: req.body.userName })
    if (userDuplicated) {
      return res.status(404).json('Ya existe un usuario con ese nombre')
    }
    const userSaved = await user.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Error al registrar usuario')
  }
}

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrecto')
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ token, user })
    } else {
      return res.status(400).json('Usuario o contraseña incorrecto')
    }
  } catch (error) {
    return res.status(400).json('Error al iniciar sesión', error)
  }
}

module.exports = {
  getUsers,
  login,
  register
}
