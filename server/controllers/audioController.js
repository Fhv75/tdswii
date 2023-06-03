const AudioFile = require("../models/AudioFile")
const TrackUserRating = require("../models/TrackUserRating")
const User = require("../models/User")
const Tag = require("../models/Tag")
const AudioFileTags = require("../models/AudioFileTags")
const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")
const sequelize = require('../db')
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
        const username = req.body.username
        console.log(username)
        const tracks = await User.findOne(
            {
                include: { model: AudioFile, required: true},
                attributes: ['username'],
                where: 
                {
                    username: username
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
async function getStatistics(req, res) {
    try {
        const trackId = req.body.trackId;
        const ratings = await TrackUserRating.findAll({
            where: { id_pista: trackId },
            attributes: [[sequelize.fn('AVG', sequelize.col('valoracion')), 'average_rating']],
          });   
        console.log(ratings); 
        const averageRating = parseFloat(ratings[0].dataValues.average_rating) || 0;  
        console.log(averageRating);      
        console.log('####################################');     
        res.status(200).json({ averageRating });
        
          
        
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

async function rateTrack(req, res) {
    try {
        const { token, rating, trackID } = req.body
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const trackUserRating = await TrackUserRating.findOne({
            where: {
                id_usuario: userMail,
                id_pista: trackID
            }
        })

        if (trackUserRating) {
            console.log("exists")                
            if (rating == 0) {
                await trackUserRating.destroy()
                return res.status(201).json({
                    message: "Track rating reset"
                })
            }
            trackUserRating.valoracion = rating
            await trackUserRating.save()
            console.log('Track rating updated in database:', trackUserRating.dataValues);
            res.status(201).json(trackUserRating)
        } else {
            console.log("does not exist")
            if (rating == 0) {
                return res.status(201).json({
                    message: "Track rating reset"
                })
            }
            const newTrackUserRating = await TrackUserRating.create({ 
                id_usuario: userMail,  
                id_pista: trackID,
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

async function getUserTrackRating (req, res) {
    try {
        const { token, trackID } = req.body
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const trackUserRating = await TrackUserRating.findOne({
            where: {
                id_usuario: userMail,
                id_pista: trackID
            }
        })

        if (trackUserRating) {
            console.log('Track rating retrieved from database');
            res.status(201).json(trackUserRating)
        } else {
            console.log('Track rating not found in database');
            res.status(201).json({valoracion: 0})
        }
    } catch(error) {
        console.error('Error retrieving track rating from database:', error);
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }


}


module.exports = {
    upload,
    uploadAudioFile,
    rateTrack,
    getUserTracks,
    getTrackTags,
    getStatistics,
    getUserTrackRating
}