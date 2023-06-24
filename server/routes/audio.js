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
    addComentario } = require('../controllers/audioController')
const { searchTracks } = require('../controllers/searchController')
const { searchTags } = require('../controllers/searchController')

router.post('/upload/:trackData', upload.fields([{
    name: 'image',
    maxCount: 1
}, {
    name: 'audio',
    maxCount: 1
}]), uploadAudioFile)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rateTrack', rateTrack)
router.post('/getStatistics', getStatistics)
router.post('/getUserRating', getUserTrackRating)
router.post('/searchTracks', searchTracks)
router.post('/searchTags', searchTags)
router.get('/file/:trackID', getAudioFile)


//para comentarios
router.post('/getComentarios', getComentarios)
router.post('/addComentario', addComentario)
//-----------------------------------------------
module.exports = router