const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('¡Conectados con la BBDD! Seguimossss')
  } catch {
    console.log('No hemos conectado con la BBDD')
  }
}

module.exports = {
  connectDB
}
