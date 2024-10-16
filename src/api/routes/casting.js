const { uploadPerformance } = require('../../middlewares/file')
const { isAdmin } = require('../../middlewares/isAdmin')
const { isAuth } = require('../../middlewares/isAuth')

const {
  getCastings,
  updateCasting,
  deleteCasting,
  postCasting
} = require('../controllers/castings')
const castingRoutes = require('express').Router()
castingRoutes.get('/', getCastings)
castingRoutes.post('/', [isAdmin], uploadPerformance.single('img'), postCasting)
castingRoutes.delete('/:id', [isAuth], deleteCasting)
castingRoutes.put('/:id',[isAuth], updateCasting)
module.exports = castingRoutes
