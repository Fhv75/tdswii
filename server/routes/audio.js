const express = require('express')
const router = express.Router()
const { upload, uploadAudioFile,  } = require('../controllers/audioController')


router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.get('/getRating', audioController.mostrarValoraciones);

module.exports = router