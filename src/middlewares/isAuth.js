const User = require('../api/models/users')
const { verifyJwt } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json('No tienes permiso. Token no proporcionado.')
    }

    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    if (!user) {
      return res
        .status(401)
        .json('Usuario no encontrado. Acceso no autorizado.')
    }

    user.password = null
    req.user = user

    next()
  } catch (error) {
    console.error('Error en autenticación:', error)
    return res
      .status(401)
      .json('Error en autenticación. Token inválido o expirado.')
  }
}

module.exports = { isAuth }
