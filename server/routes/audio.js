const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile, obtenerPistaAudio } = require('../controllers/audioController')

router.post('/upload/:title', upload.single('audioFile'), uploadAudioFile)
router.get('/audio/:id', obtenerPistaAudio);
module.exports = router