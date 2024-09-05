const upload = require('../../middlewares/file')
const {
  getCastings,
  updateCasting,
  deleteCasting,
  postCasting
} = require('../controllers/castings')

const castingRoutes = require('express').Router()

castingRoutes.get('/', getCastings)
castingRoutes.post('/', upload.single('img'), postCasting)
castingRoutes.delete('/:id', deleteCasting)
castingRoutes.put('/:id', updateCasting)

module.exports = castingRoutes