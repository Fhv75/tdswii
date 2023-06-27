const AudioFile = require("../models/AudioFile");
const User = require("../models/User");
const sequelize = require("../db");
const transporter = require("../utils/email");

async function getPendingTracks(req, res) {
  try {
    const pendingTracks = await AudioFile.findAll({
      where: {
        isapproved: false
      },
    });

    res.status(200).json(pendingTracks);
  } catch (error) {
    console.error("Error al obtener las pistas pendientes");
    console.error(error.name);
    console.error(error.message);
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  }
}

async function approveTrack(req, res) {
  try {
    const trackId = req.params.trackId;

    const audioFile = await AudioFile.findOne({
      where: {
        id: trackId
      }
    });

    if (!audioFile) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    audioFile.isapproved = true;
    await audioFile.save();

    const user = await User.findOne({
      where: {
        correo: audioFile.id_user_cargas
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const mailOptions = {
      from: "canorecords00@gmail.com",
      to: user.correo,
      subject: "Canción Aprobada",
      text: `Felicidades! Tu canción "${audioFile.titulo}" ha sido aprovada.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Track approved successfully"
    });
  } catch (error) {
    console.error("Error al aprobar la pista");
    console.error(error.name);
    console.error(error.message);
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  }
}

async function rejectTrack(req, res) {
  try {
    const trackId = req.params.trackId;

    const audioFile = await AudioFile.findOne({
      where: {
        id: trackId
      }
    });

    if (!audioFile) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    await audioFile.destroy();

    const user = await User.findOne({
      where: {
        correo: audioFile.id_user_cargas
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const mailOptions = {
      from: "canorecords00@gmail.com",
      to: user.correo,
      subject: "Canción Rechazada",
      text: `Lo sentimos, tu canción "${audioFile.titulo}" ha sido rechazada debido a infringe las póliticas de la plataforma.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Track rejected successfully"
    });
  } catch (error) {
    console.error("Error al rechazar la pista");
    console.error(error.name);
    console.error(error.message);
    res.status(400).json({
      error: error.name,
      message: error.message,
    });
  }
}

module.exports = {
  getPendingTracks,
  approveTrack,
  rejectTrack,
};