const AudioFile = require("../models/AudioFile");
const User = require("../models/User");
const sequelize = require("../db");

async function getPendingTracks(req, res) {
  try {
    const pendingTracks = await AudioFile.findAll({
      where: { isapproved: false },
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

    await AudioFile.update(
      { isapproved: true },
      { where: { id: trackId } }
    );

    res.status(200).json({ message: "Pista aprobada exitosamente" });
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

    await AudioFile.destroy({ where: { id: trackId } });

    res.status(200).json({ message: "Pista rechazada exitosamente" });
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
