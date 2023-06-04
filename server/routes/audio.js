const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile, getUserTracks, getTrackTags, rateTrack, getUserTrackRating, getStatistics, getComentarios } = require('../controllers/audioController')

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rateTrack', rateTrack)
router.post('/getStatistics', getStatistics)
router.post('/getUserRating', getUserTrackRating)

//para comentarios
router.post('/getComentarios', getComentarios)
////////////////////
module.exports = router