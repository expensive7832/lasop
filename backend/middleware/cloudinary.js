const  cloudinary = require("cloudinary")
const  dotenv = require("dotenv")

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true
})

module.exports = cloudinary