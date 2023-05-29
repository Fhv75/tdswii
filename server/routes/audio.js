const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile, getUserTracks } = require('../controllers/audioController')

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )

module.exports = router