const express = require('express')
const router = express.Router()
const { uploadAudio,uploadImage, uploadAudioFile, getUserTracks, getTrackTags, rateTrack, getUserTrackRating, getStatistics } = require('../controllers/audioController')

router.post('/upload/:trackData', uploadAudio.single('audioFile'), uploadAudioFile)
outer.post('/upload/:imageData', uploadImage.single('audioFile'), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rateTrack', rateTrack)
router.post('/getStatistics', getStatistics)
router.post('/getUserRating', getUserTrackRating)
module.exports = router