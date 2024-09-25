const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      allowedFormats: ['jpg', 'png', 'gif', 'jpeg', 'webp']
    }
  })
}

const upload = (folderName) => multer({ storage: storage(folderName) })

const uploadPerformance = upload('Obras')
const uploadCV = upload('CV')

module.exports = { uploadPerformance, uploadCV }
