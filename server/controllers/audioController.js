const AudioFile = require("../models/AudioFile")
const TrackUserRating = require("../models/TrackUserRating")
const User = require("../models/User")

const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")

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

async function rateTrack(req, res) {
    try {
        const { token, rating, trackTitle, trackArtist } = req.body
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const user = await User.findOne({ 
            where: { 
                correo: userMail 
            } 
        })

        const trackUploader = await User.findOne({
            where: {
                username: trackArtist
            }
        })
        const track = await AudioFile.findOne({ 
            where: { 
                titulo: trackTitle,
                id_user_cargas: trackUploader.correo
            } 
        })

        const trackUserRating = await TrackUserRating.findOne({
            where: {
                id_usuario: user.correo,
                id_pista: track.id
            }
        })

        if (trackUserRating) {
            console.log("exists")
            trackUserRating.valoracion = rating
            await trackUserRating.save()
            console.log('Track rating updated in database:', trackUserRating.dataValues);
            res.status(201).json(trackUserRating)
        } else {
            console.log("does not exist")
            const newTrackUserRating = await TrackUserRating.create({ 
                id_usuario: user.correo,  
                id_pista: track.id,
                valoracion: rating
            })
            console.log('Track rating saved to database:', newTrackUserRating.dataValues);
            res.status(201).json(newTrackUserRating)
        }
    } 
    catch (error) {
        console.error('Error saving track rating to database:', error);
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function getAverageRating(req, res) {
    const trackRatings = await TrackUserRating.findAll(
        { where: { id_pista: req.track.id } }
    ).map((rating) => rating.valoracion)

    const averageRating = trackRatings.reduce((a, b) => a + b, 0) / trackRatings.length
    
    res.status(200).json(averageRating)
}

module.exports = {
    upload,
    uploadAudioFile,
    rateTrack,
}