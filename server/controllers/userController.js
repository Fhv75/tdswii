const User = require("../models/User")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const transporter = require("../utils/email")

dotenv.config()

function generateUserToken(email) {
    const token = jwt.sign(
        {id: email}, 
        `${process.env.JWT_SECRET}`, 
        { expiresIn: "6h" }
    )

    return token
}

async function registerUser (req, res) {
    try {
        const { correo, username, password } = req.body
        const newUser = await User.create({ correo: correo, username: username, password: password, tipo_user: "usuario"})

        const token = generateUserToken(correo)

        res.status(201).json(
            {
                token,
                correo: newUser.email,
                username: newUser.username,
            }
        )
    } 
    catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function loginUser (req, res) {
    try {
        const { correo, password } = req.body
        const user = await User.findOne(
            { where: {
                correo: correo, 
                password: password
            }})
        
            if( user === null ) {
                res.status(401).json({message: "Email or password incorrect"})
            } else 
            {
                const token = generateUserToken(correo)
                
                res.json({ token, username: user.username })
            }
    } 
    catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

async function resetUserPasswordRequest(req, res) {
    const { email } = req.body
    try {
        const user = await User.findByPk(email)

        if (user === null) {
            return res.status(404).json({message: "User not found"})
        }

        const token = jwt.sign(
            { id: user.correo }, 
            `${process.env.JWT_SECRET}`,
            { expiresIn: "1h" }
        )

        const resetUrl = `http://localhost:3000/reset-password/${token}`
        const mailOptions = {
            from: "canorecords00@gmail.com",
            to: email,
            subject: "Recuperación de Contraseña",
            text: `Haz click en el siguiente link para obtener una nueva contraseña: ${resetUrl}`
        }

        await transporter.sendMail(mailOptions)
        
        res.status(200).json({ message: "Pw reset mail sent" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

async function resetUserPasswordResponse(req, res) {
    const { token } = req.params
    const { newPassword } = req.body
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        const user = await User.findByPk(userMail)

        if(user === null) {
            return res.status(404).json({ message: "User not found" })
        }

        user.password = newPassword
        await user.save()

        res.status(200).json({ message: "Password updated succesfully"})

    } catch (error) {
        console.error(error)

        if (error instanceof jwt.TokenExpiredError) {
            res.status(400).json( {message: "Password reset token has expired "})
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: "Invalid password reset token" })
        } else {
            res.status(500).json({ message: "Server error" })
        }
    }
}

 async function getUserData (req, res) {
    const { username } = req.body
    console.log(username)
    try {
        const user = await User.findOne({ where: {username: username} })

        if(user === null) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            email: user.correo,
            username: user.username,
            ciudad: user.ciudad,
            biografia: user.biografia
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
 }

 async function updateProfile(req, res) {
    const { token, username, ciudad, biografia } = req.body
    try {
        // Converting token to email

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        // Searching user by email

        const user = await User.findByPk(userMail)

        if(user === null) {
            return res.status(404).json({ message: "User not found" })
        }

        // If any value from the body is blank or it's the same as the one the user object holds, don't update it.

        if(username !== "" || username !== user.username) {
            user.username = username
        }

        if(ciudad !== "" || ciudad !== user.ciudad) {
            user.ciudad = ciudad
        }

        if(biografia !== "" || biografia !== user.biografia) {
            user.biografia = biografia
        }

        await user.save()

        res.status(200).json({ message: "Profile updated succesfully"})
        

       

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
 }

 async function updatePassword(req, res) {
    const { token, password } = req.body
    try {
        // Converting token to email

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        const userMail = decoded.id

        // Searching user by email

        const user = await User.findByPk(userMail)

        if(user === null) {
            return res.status(404).json({ message: "User not found" })
        }

        user.password = password
        await user.save()

        res.status(200).json({ message: "Password updated succesfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
 }

 async function sendUserMessage(req, res) {
    try {
        const {
            name,
            mail,
            message
        } = req.body

        console.log("skdfhkajfsa")

        const mailOptions = {
            from: "canorecords00@gmail.com",
            to: "canorecords00@gmail.com",
            subject: "Mensaje de Contacto",
            text: `de: ${name}\n desde: ${mail}\n mensaje: ${message}`
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({
            message: "Mail has been sent"
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.name,
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    resetUserPasswordRequest,
    resetUserPasswordResponse,
    getUserData,
    updateProfile,
    updatePassword,
    sendUserMessage
}