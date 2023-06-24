const AudioFile = require('../models/AudioFile');
const Tag = require('../models/Tag')
const AudioFileTags = require('../models/AudioFileTags')
const User = require('../models/User')
const { Op } = require('sequelize');

 exports.searchTracks = async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const searchResults = await AudioFile.findAll({
        where: {
          titulo: {
            [Op.iLike]: `%${searchTerm}%`
          }
        }
      });
    
      res.json(searchResults);
    };

    exports.searchUsers = async (req, res) => {
      const searchTerm = req.body.searchTerm;
    
      try {
        const searchResults = await User.findAll({
          where: {
            username: {
              [Op.iLike]: `%${searchTerm}%`
            }
          }
        });
    
        res.json(searchResults);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while searching for users.' });
      }
    };
    exports.searchTags = async (req, res) => {
      const searchTerm = req.body.searchTerm;
    
      try {
        const searchResults = await Tag.findAll({
          where: {
            TAG: {
              [Op.iLike]: `%${searchTerm}%`
            },
          },
          
        });
    
        res.json(searchResults);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while searching for tags.' });
      }
    };
    