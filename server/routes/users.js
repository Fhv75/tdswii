const express = require('express');
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/password-recovery", userController.resetUserPasswordRequest)
router.post("/reset-password/:token", userController.resetUserPasswordResponse)
router.post("/getUserData", userController.getUserData)
router.post("/update-profile", userController.updateProfile)
router.post("/update-password", userController.updatePassword)
router.post("/contact", userController.sendUserMessage)


module.exports = router