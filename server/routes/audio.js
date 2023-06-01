const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile, getUserTracks, getTrackTags, rateTrack } = require('../controllers/audioController')

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rate-track', rateTrack)
module.exports = router