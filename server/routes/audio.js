const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile, getUserTracks, getTrackTags, getStatistics } = require('../controllers/audioController')


router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.post('/getStatistics', getStatistics)
const { upload, uploadAudioFile, getUserTracks, getTrackTags, rateTrack, getUserTrackRating } = require('../controllers/audioController')

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rateTrack', rateTrack)
router.post('/getUserRating', getUserTrackRating)
module.exports = router