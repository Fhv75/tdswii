const express = require('express')
const router = express.Router()
const { 
    upload, 
    uploadAudioFile, 
    getUserTracks, 
    getTrackTags, 
    rateTrack, 
    getUserTrackRating, 
    getStatistics, 
    getAudioFile,
    getComentarios,
    addComentario,
    purchaseTrack } = require('../controllers/audioController')

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rateTrack', rateTrack)
router.post('/getStatistics', getStatistics)
router.post('/getUserRating', getUserTrackRating)
router.get('/file/:trackID', getAudioFile)

//para comentarios
router.post('/getComentarios', getComentarios)
router.post('/addComentario', addComentario)
//-----------------------------------------------

//Para comprar
router.post('/purchaseTrack', purchaseTrack);
//-------------------------------------------------
module.exports = router