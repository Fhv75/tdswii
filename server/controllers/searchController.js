const AudioFile = require('../models/AudioFile');
const { Op } = require('sequelize');

exports.searchTracks = (req, res) => {
    const searchTerm = req.body.searchTerm;
    const searchResults = AudioFile.findAll({
        where: {
          titulo: {
            [Op.iLike]: `%${searchTerm}%`
          }
        }
      });
    
      res.json(searchResults);
    };