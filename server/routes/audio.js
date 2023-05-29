const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile } = require('../controllers/audioController')

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)

module.exports = router