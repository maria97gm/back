const User = require('../api/models/users')
const { verifyJwt } = require('../config/jwt')

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(403).json('Error, no tienes permiso')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json('Usuario no encontrado')
    }

    // Verificar si el usuario es administrador
    if (user.rol && user.rol === 'admin') {
      user.password = null 
      req.user = user 
      return next() 
    } else {
      return res.status(403).json('No eres administrador.') 
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json('Error interno del servidor.')
  }
}

module.exports = { isAdmin }
