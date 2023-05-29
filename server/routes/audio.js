const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile, obtenerPistaAudio } = require('../controllers/audioController')


router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.get('/getTrack/:id', obtenerPistaAudio);

module.exports = router