const { uploadPerformance } = require('../../middlewares/file')
const { isAdmin } = require('../../middlewares/isAdmin')

const {
  getCastings,
  updateCasting,
  deleteCasting,
  postCasting,
  deleteUserCasting
} = require('../controllers/castings')
const castingRoutes = require('express').Router()
castingRoutes.get('/', getCastings)
castingRoutes.post('/', [isAdmin], uploadPerformance.single('img'), postCasting)
castingRoutes.delete('/:id', deleteCasting)
castingRoutes.put('/:id', updateCasting)
module.exports = castingRoutes
