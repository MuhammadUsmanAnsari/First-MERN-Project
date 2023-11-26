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
app.use(express.static("upload"))
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/upload', require('./routes/imageUploader'))


app.listen(port, () => console.log(`app is listening successfully on port ${port}`))
