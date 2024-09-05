const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Obras',
    allowedFormated: ['jpg', 'png', 'gif', 'jpeg', 'webp']
  }
})

const upload = multer({ storage })

module.exports = upload
