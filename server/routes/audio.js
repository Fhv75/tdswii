const express = require('express')
const router = express.Router()
const { 
    upload, 
    getEstadisticasUsuario,
    addReproduccion,
    uploadAlbum,
    uploadAudioFile, 
    getUserTracks, 
    getTrackTags, 
    rateTrack, 
    getUserTrackRating, 
    getStatistics, 
    getAudioFile,
    getComentarios,
    addComentario,
    getAdminTracks } = require('../controllers/audioController')
const { searchTracks } = require('../controllers/searchController')
const { searchTags } = require('../controllers/searchController')

router.post('/upload/:trackData', upload.fields([{
    name: 'image',
    maxCount: 1
}, {
    name: 'audio',
    maxCount: 1
}]), uploadAudioFile)
router.post('/uploadAlbum/:albumData', upload.single("image"), uploadAlbum)
router.post('/getUserTracks', getUserTracks )
router.post('/getTrackTags', getTrackTags )
router.post('/rateTrack', rateTrack)
router.post('/getStatistics', getStatistics)
router.post('/getUserRating', getUserTrackRating)
router.post('/searchTracks', searchTracks)
router.post('/searchTags', searchTags)
router.post('/getEstadisticasUsuario', getEstadisticasUsuario)
router.get('/file/:trackID', getAudioFile)
router.get('/getAdminTracks', getAdminTracks)
router.get('/addReproduccion/:trackID', addReproduccion)


//para comentarios
router.post('/getComentarios', getComentarios)
router.post('/addComentario', addComentario)
//-----------------------------------------------
module.exports = router