const express = require('express')
const router = express.Router()
const audioController = require('../controllers/audioController')

router.post('/upload/:title', audioController.upload.single('audioFile'), audioController.uploadAudioFile)
router.post('/rate-track', audioController.rateTrack)

module.exports = router