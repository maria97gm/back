const { generateSign } = require('../../config/jwt')
const Casting = require('../models/casting')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate('castings')
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(404).json('No hemos podido acceder a los usuarios')
  }
}


const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ userName: req.body.userName })
    if (userDuplicated) {
      return res.status(404).json('Ya existe un usuario con ese nombre')
    }
    const user = new User(req.body)
    const userSaved = await user.save()
    const token = generateSign(userSaved._id)

    return res.status(201).json({
      user: userSaved,
      token
    })
  } catch (error) {
    console.error(error)
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

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json(userDeleted)
  } catch (error) {
    console.log(error)
  }
}

const updateUserCV = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, age } = req.body
    const photo = req.file ? req.file.path : null

    const updateData = { name, age }

    if (photo) {
      updateData.photo = photo
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error al actualizar el CV')
  }
}

const deleteUserCasting = async (req, res) => {
  try {
    const { id, castingId } = req.params

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { castings: castingId } },
      { new: true }
    )
    const updatedCasting = await Casting.findByIdAndUpdate(
      castingId,
      { $inc: { userCount: -1 } },
      { new: true }
    )

    return res.status(200).json({ updatedUser, updatedCasting })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al eliminar el casting', error })
  }
}

const updateUserCastings = async (req, res, next) => {
  try {
    const { id } = req.params
    const { castings } = req.body

    if (!castings || castings.length === 0) {
      return res
        .status(400)
        .json('No se proporcionaron castings para actualizar')
    }

    const castingsArray = Array.isArray(castings) ? castings : [castings]

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { castings: { $each: castingsArray } } },
      { new: true }
    ).populate('castings')

    if (!updatedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    await Casting.updateMany(
      { _id: { $in: castingsArray } },
      { $inc: { userCount: 1 } }
    )

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error al actualizar los castings', error)
  }
}

module.exports = {
  getUsers,
  login,
  register,
  deleteUser,
  deleteUserCasting,
  updateUserCV,
  updateUserCastings
}
