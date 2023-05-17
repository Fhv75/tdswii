const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const usersRoutes = require("./routes/users")
const audioRoutes = require('./routes/audio')

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/users", usersRoutes)
app.use("/audio", audioRoutes)


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})