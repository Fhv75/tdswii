const express = require('express');
const router = express.Router();
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
    getStatisticsUser,
    addComentario } = require('../controllers/audioController');

router.post('/upload/:trackData', upload.single('audioFile'), uploadAudioFile);
router.post('/getUserTracks', getUserTracks);
router.post('/getTrackTags', getTrackTags);
router.post('/rateTrack', rateTrack);
router.post('/getStatistics', getStatistics);
router.post('/getUserRating', getUserTrackRating);
router.get('/file/:trackID', getAudioFile);

// Para comentarios
router.post('/getComentarios', getComentarios);
router.post('/addComentario', addComentario);
router.post('/getStatisticsUser', getStatisticsUser);

module.exports = router;
