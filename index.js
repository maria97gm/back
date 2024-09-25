require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { connectDB } = require('./src/config/db')
const castingRoutes = require('./src/api/routes/casting')
const { connectCloudinary } = require('./src/config/file')
const userRoutes = require('./src/api/routes/user')

const app = express()
app.use(express.json())

app.use(cors())

connectDB()
connectCloudinary()

app.use('/api/v1/castings', castingRoutes)
app.use('/api/v1/users', userRoutes)

app.use('*', (req, res, next) => {
  res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Accede aquí:http://localhost:3000')
})
