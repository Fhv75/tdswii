const AudioFile = require("../models/AudioFile")
const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")
// SDKJFHASDJKLFHSLDAKFHSDJKLFHLKASDJHFLJKSDHFLJKADHJFLKDSHLJKFJDAS

// DX
// XD

// me borraron mi comentario :8
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/userUploads"))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const title = req.params.title

        cb(null, `${title + '-' + Date.now()}${ext}`)
    }
})  

const upload = multer({ storage: storage })

async function uploadAudioFile (req, res) {
    try {
        const titulo = req.body.titulo
        const token = req.body.token
        const tags = JSON.parse(req.body.tags)

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const newAudioFile = await AudioFile.create({ 
            titulo: titulo,  
            id_user_cargas: userMail
        })

        await newAudioFile.setTags(tags)

        console.log('File metadata saved to database:', newAudioFile.dataValues);
        res.status(201).json(newAudioFile)
    } 
    catch (error) {
        console.error('Error saving file metadata to database:', error);
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

module.exports = {
    upload,
    uploadAudioFile,
}