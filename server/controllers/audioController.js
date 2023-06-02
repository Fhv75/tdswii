const AudioFile = require("../models/AudioFile")
const TrackUserRating = require("../models/TrackUserRating")
const User = require("../models/User")
const Tag = require("../models/Tag")
const AudioFileTags = require("../models/AudioFileTags")
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
           
async function getStatistics(req, res) {
    try {
        const trackId = req.body.trackId;
        const ratings = await TrackUserRating.findAll({where:{id_pista : trackId}});
        
        console.log(ratings);
        res.status(200).json(ratings);
        
    } catch (error) {
        console.error('Error', error);
        console.error(error.name)
        console.error(error.message)
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message
        }); 
    }
}

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
async function getUserTracks(req, res){
    try{
        const token = req.body.token
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id
        const tracks = await AudioFile.findAll(
            {
                include: { model: User, required: true, attributes: ['username']},
                where: 
                {
                    id_user_cargas:userMail
                }
            }
        )
        res.status(201).json(tracks)
    }
    catch(error){
        console.error("Error al obtener pistas")
        console.error(error.name)
        console.error(error.message)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}
// Utilizar esta función dentro de useEffect() en
// MusicCard.jsx para obtener las etiquetas de la pista
async function getTrackTags(req, res) {
    try {
        const trackId = req.body.trackId
        
        const tags = await AudioFileTags.findAll({
            include: { model: Tag, required: true, attributes: ['TAG']},
            where: {
                id_pista: trackId
            }
        })
        res.status(200).json(tags)
    }
    catch (error) {
        console.error("Error al obtener etiquetas de pista")
        console.error(error.name)
        console.error(error.message)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

module.exports = {
    upload,
    uploadAudioFile,
    getStatistics,
    getUserTracks,
    getTrackTags
}