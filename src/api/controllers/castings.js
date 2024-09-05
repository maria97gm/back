const Casting = require('../models/casting')

const getCastings = async (req, res, next) => {
  try {
    const allCastings = await Casting.find()
    return res.status(200).json(allCastings)
  } catch (error) {
    return res.status(404).json('No hemos podido acceder a los castings')
  }
}

const postCasting = async (req, res, next) => {
  try {
    const newCasting = new Casting(req.body)
    if (req.file) {
      newCasting.img = req.file.path
    }
    const castingSaved = await newCasting.save()
    return res.status(201).json(castingSaved)
  } catch (error) {
    return res.status(404).json('No hemos podido crear un nuevo casting')
  }
}

const deleteCasting = async (req, res, next) => {
  try {
    const { id } = req.params

    const castingDeleted = await Casting.findByIdAndDelete(id)
    return res.status(200).json(castingDeleted)
  } catch (error) {
    return res.status(404).json('No hemos podido eliminar el casting')
  }
}

const updateCasting = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body
    const updateCasting = await Casting.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(updateCasting)
  } catch (error) {
    return res.status(404).json('No hemos podido actualizar el casting')
  }
}

module.exports = {
  getCastings,
  updateCasting,
  postCasting,
  deleteCasting
}
