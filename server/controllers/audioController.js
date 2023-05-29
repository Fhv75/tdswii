const AudioFile = require("../models/AudioFile")
const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/userUploads/audio"))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const trackData = req.params.trackData

        cb(null, `${trackData}${ext}`)
    }
})  

const upload = multer({ storage: storage })



async function obtenerPistaAudio (req, res){
    try {
         const pistaId = req.params.id;
         const pistaDeAudio = await AudioFile.findByPk(pistaId);
         if (pistaDeAudio) {
            res.status(200).json(pistaDeAudio);
            } else {
            res.status(404).json({ error: "Pista de audio no encontrada" });
            }
        }    
    catch (error) {
            console.error("Error al obtener la pista de audio:", error);
            res.status(500).json({ error: "Error del servidor" });
            }
            }
            
            module.exports = {
            obtenerPistaAudio,
            };


async function uploadAudioFile (req, res) {
    try {
        const titulo = req.body.titulo
        const token = req.body.token
        const tags = JSON.parse(req.body.tags)

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const newAudioFile = await AudioFile.create({ 
            titulo: titulo,  
            id_user_cargas: userMail,
            nombre_archivo: titulo + "-" + userMail
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
    obtenerPistaAudio,
}