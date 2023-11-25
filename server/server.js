const path = require('path')
const express = require('express')
const colors = require("colors")
const dotenv = require('dotenv').config()
var cors = require('cors')

const { errorHandler } = require("./middleware/errorMiddleWare")
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// server frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send("Please select production mode"))
}


app.listen(port, () => console.log(`app is listening successfully on port ${port}`))