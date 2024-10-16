const User = require('../api/models/users')
const { verifyJwt } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(400).json('Error no tienes permiso')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)
    const user = await User.findById(id)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    console.log('Error:error')
    return res.status(400).json('Error en autenticación')
  }
}

module.exports = { isAuth }
