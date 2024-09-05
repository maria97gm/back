const mongoose = require('mongoose')

const castingSchema = new mongoose.Schema(
  {
    performance: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'castings'
  }
)

const Casting = mongoose.model('castings', castingSchema, 'castings')

module.exports = Casting
