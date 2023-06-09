const AudioFile = require("../models/AudioFile")
const TrackUserRating = require("../models/TrackUserRating")
const User = require("../models/User")
const Tag = require("../models/Tag")
const AudioFileTags = require("../models/AudioFileTags")
const Album = require("../models/Album")
const TrackAlbum = require("../models/TrackAlbum")
const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")
const sequelize = require('../db')
const fs = require('fs')

const Comentarios = require("../models/Comentarios")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname === 'image')
            cb(null, path.join(__dirname, "../public/userUploads/images"))
        else
            cb(null, path.join(__dirname, "../public/userUploads/audio"))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (req.params.trackData !== undefined) {
            const trackData = req.params.trackData
            cb(null, `${trackData}${ext}`)
        } else {
            const albumData = req.params.albumData
            cb(null, `${albumData}-album${ext}`)
        }
    }
})

const upload = multer({ storage: storage })

async function uploadAudioFile (req, res) {
    try {
        const titulo = req.body.titulo
        const token = req.body.token
        const tags = JSON.parse(req.body.tags)
        const username = req.body.username
        const precio = req.body.precio
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const newAudioFile = await AudioFile.create({
            titulo: titulo,
            id_user_cargas: userMail,
            nombre_archivo: titulo + "-" + username,
            precio: precio,
            imagen_pista: titulo + "-" + username,
            isapproved: false
        })

        await newAudioFile.setTags(tags)

        console.log('File metadata saved to database:', newAudioFile.dataValues);
        res.status(201).json(newAudioFile)
    } 
    catch (error) {
        console.error('Error saving file metadata to database:', error);
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function getUserTracks(req, res){
    try{
        const username = req.body.username
        const tracks = await User.findOne(
            {
                include: { model: AudioFile, required: true},
                attributes: ['username'],
                where: 
                {
                    username: username
                }
            }
        )

        res.status(201).json(tracks)
    }
    catch(error){
        console.error("Error al obtener pistas")
        console.error(error.name)
        console.error(error.message)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}
async function getStatistics(req, res) {
    try {
        const trackId = req.body.trackId;
        const ratings = await TrackUserRating.findAll({
            where: { id_pista: trackId },
            attributes: [[sequelize.fn('AVG', sequelize.col('valoracion')), 'average_rating']],
          });   
        const averageRating = parseFloat(ratings[0].dataValues.average_rating) || 0;  
        const comments = await sequelize.query(
            `SELECT COUNT(*) AS total_comentarios FROM comentario_pista WHERE id_pista = :id_pista`, {
                replacements: {
                    id_pista: trackId
                },
                type: sequelize.QueryTypes.SELECT
            }
        );



        res.status(200).json({ averageRating, comments: comments[0].total_comentarios });
        
    } catch (error) {
        console.error('Error', error);
        console.error(error.name)
        console.error(error.message)
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message
        }); 
    }
}

async function getTrackTags(req, res) {
    try {
        const trackId = req.body.trackId
        
        const tags = await AudioFileTags.findAll({
            include: { model: Tag, required: true, attributes: ['TAG']},
            where: {
                id_pista: trackId
            }
        })
        res.status(200).json(tags)
    }
    catch (error) {
        console.error("Error al obtener etiquetas de pista")
        console.error(error.name)
        console.error(error.message)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function rateTrack(req, res) {
    try {
        const { token, rating, trackID } = req.body
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const trackUserRating = await TrackUserRating.findOne({
            where: {
                id_usuario: userMail,
                id_pista: trackID
            }
        })

        if (trackUserRating) {
            console.log("exists")                
            if (rating == 0) {
                await trackUserRating.destroy()
                return res.status(201).json({
                    message: "Track rating reset"
                })
            }
            trackUserRating.valoracion = rating
            await trackUserRating.save()
            res.status(201).json(trackUserRating)
        } else {
            console.log("does not exist")
            if (rating == 0) {
                return res.status(201).json({
                    message: "Track rating reset"
                })
            }
            const newTrackUserRating = await TrackUserRating.create({ 
                id_usuario: userMail,  
                id_pista: trackID,
                valoracion: rating
            })
            res.status(201).json(newTrackUserRating)
        }
    } 
    catch (error) {
        console.error('Error saving track rating to database:', error);
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function getUserTrackRating (req, res) {
    try {
        const { token, trackID } = req.body
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const trackUserRating = await TrackUserRating.findOne({
            where: {
                id_usuario: userMail,
                id_pista: trackID
            }
        })

        if (trackUserRating) {
            console.log('Track rating retrieved from database');
            res.status(201).json(trackUserRating)
        } else {
            console.log('Track rating not found in database');
            res.status(201).json({valoracion: 0})
        }
    } catch(error) {
        console.error('Error retrieving track rating from database:', error);
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }


}

async function getAudioFile(req, res) {
    try {
        const trackID = req.params.trackID
        const track = await AudioFile.findOne({
            where: {
                id: trackID
            }
        })

        const uploader = await User.findOne({
            where: {
                correo: track.id_user_cargas
            }
        })

        const filename = track.titulo + "-" + uploader.username + ".mp3"
        const filePath = path.join(__dirname, `../public/userUploads/audio/${filename}`)
        fs.readFile(filePath, (err, data) => {
            if(err) {
                console.error(err)
                return res.status(500).send("Error reading the file")
            }
            res.setHeader('Content-Type', 'audio/mpeg')
            res.setHeader('Content-Disposition', 'attachment; filename=' + filename)

            res.status(200).send(data)
        })
    }
    catch (error) {
        console.error("Error al obtener archivo de audio")
        console.error(error.name)
        console.error(error.message)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}
  
//----------------------------------------------------------------------------------
  //Añadir Comentarios
  async function addComentario(req, res){
    try {
      const { token, comentario, id_pista/* , id_usuario */ } = req.body;
      /* const id_usuario = req.user.id; */ // Utiliza el ID del usuario actual
      //const token = req.headers.authorization;
      // Verificar el token y realizar la validación de autenticación
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Verificar la autenticación del usuario si es necesario
      const userMail = decoded.id 
      // Crear el nuevo comentario
      const newComment = await Comentarios.create({
       /*  id_usuario, */
        id_pista: id_pista,
        comentario: comentario,
        id_usuario: userMail,
      });
    
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error al crear un comentario:', error);
      res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  };

  //Obtener los comentarios de los usuarios

    async function  getComentarios(req, res){
    try {
      const {token, trackID } = req.body;
      
      //const token = req.headers.authorization;
      // Verificar el token y realizar la validación de autenticación
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Verificar la autenticación del usuario si es necesario
  
      // Obtener los comentarios de la pista especificada
      const comentarios = await Comentarios.findAll({
        where: {
          id_pista: trackID,
        },
      });
  
      res.status(200).json(comentarios);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  };

//----------------------------------------------------------------------------

async function getAdminTracks(req, res) {
    try {
        const adminUsers = await User.findAll({
            where: {tipo_user: "admin"}
        })
        const tracks = await AudioFile.findAll({
            where: {id_user_cargas: 
                adminUsers.map(user => user.correo)}
        })
        res.status(200).json(tracks)
    } catch(error) {
        console.error(error)
        res.status(500).json({
            error: error.name,
            message: error.message
        })
    }
}

async function uploadAlbum(req, res) {
    const username = req.body.username
    const titulo = req.body.titulo
    const artista = req.body.artista
    const precio = req.body.precio
    const tags = JSON.parse(req.body.tags)
    const pistas = JSON.parse(req.body.pistas)

    try {
        const newAlbum = await Album.create({
            titulo: titulo,
            artista: artista,
            url_portada: titulo + "-" + username,
            precio: precio
        })
        const albumID = newAlbum.id
        
        for (let i = 0; i < pistas.length; i++) {
            const trackID = pistas[i].id
            console.log(trackID)
            await TrackAlbum.create({
                idalbum: albumID,
                idpista: trackID
            })
        }

        await newAlbum.setTags(tags)

        res.status(201).json(newAlbum)
    }
    catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function addReproduccion(req, res) {
    try {
        const trackID = req.params.trackID
        const track = await AudioFile.findOne({
            where: {
                id: trackID
            }
        })
        track.cant_reprod += 1
        await track.save()
        res.status(201).json(track)
    }
    catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function getEstadisticasUsuario(req, res) {
    try {
        const username = req.body.username
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        const reproducciones = await sequelize.query(
            `CALL getTotalReproducciones(:userId, :out)`, {
                replacements: {
                    userId: user.correo,
                    out: ''
                },
            }
        )

        const valoraciones = await sequelize.query(
            `CALL getValoracionPromedio(:userId, :out)`, {
                replacements: {
                    userId: user.correo,
                    out: ''
                },
            }
        );
        const comentarios = await sequelize.query(
            `CALL getTotalComentarios(:userId, :out)`, {
                replacements: {
                    userId: user.correo,
                    out: ''
                },
            }
        );
        const totalReproducciones = reproducciones[0][0].res || 0;
        const totalComentarios = comentarios[0][0].res || 0;
        const promedioValoraciones = Math.trunc(valoraciones[0][0].res * Math.pow(10, 1)) / Math.pow(10, 1)
        console.log(promedioValoraciones)
        console.log(valoraciones)
        res.status(200).json({
            totalReproducciones,
            promedioValoraciones,
            totalComentarios,
        })
    } catch (error) {
        console.error('Error al obtener las reproducciones del usuario:', error);
        res.status(500).json({
            error: 'Error del servidor',
            message: error.message
        });
    }
}

async function getTrack(req, res) {
    try {
        const trackId = req.body.trackId
        const track = await AudioFile.findOne({ 
            where: {
                id: trackId
            }
        })
        const uploader = await User.findOne({
            where: {
                correo: track.id_user_cargas
            }
        })
        track.dataValues.artista = uploader.username
        track.dataValues.nombre_archivo = "http://localhost:5000/public/userUploads/audio/" + track.nombre_archivo + ".mp3"
        track.dataValues.imagen_pista = "http://localhost:5000/public/userUploads/images/" + track.imagen_pista ? track.imagen_pista : 'logomelorit' + ".jpg"
        console.log(track)
        res.status(200).json(track)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}
async function getAllTracks(req,res){
    try {
    const tracks = await AudioFile.findAll()
    res.status(200).json(tracks)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }

}

// Variable para almacenar el estado de compra de las pistas (en memoria)

const purchasedTracks = {}; //lleva registro de pistas compradas por los usuarios

// Controlador para comprar una pista musical
async function purchaseTrack(req, res) {
  const { trackID } = req.body;
  const userID = req.user ? req.user.id : null; // Obtener el ID del usuario (si está autenticado)

  try {
    // Verificar si la pista ya ha sido comprada por el usuario
    const isPurchased = purchasedTracks[trackID] && purchasedTracks[trackID][userID];

    // Validar si la pista ya ha sido comprada
    if (isPurchased) {
      return res.json({ message: 'La pista ya ha sido comprada anteriormente.' });
    }

    // Marcar la pista como comprada por el usuario
    if (!purchasedTracks[trackID]) {
      purchasedTracks[trackID] = {};
    }
    purchasedTracks[trackID][userID] = true;

    // Responder con un mensaje de éxito
    res.json({ message: 'Pista comprada exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al procesar la compra.' });
  }
}

//----------------------------------------------------------------------------
module.exports = {
    upload,
    getTrack,
    getEstadisticasUsuario,
    addReproduccion,
    uploadAlbum,
    getAdminTracks,
    uploadAudioFile,
    rateTrack,
    getUserTracks,
    getTrackTags,
    getStatistics,
    getUserTrackRating,
    getAudioFile,
    getComentarios,
    addComentario,
    getAllTracks,
    purchaseTrack
}