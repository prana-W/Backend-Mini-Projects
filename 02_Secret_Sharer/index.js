const express = require('express')
const app = express()
const port = process.env.PORT || 8001
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')

// File Imports
const connectDB = require('./connection')
const staticRoutes = require('./routes/static.route')
const messageRoutes = require('./routes/message.route')
const userRoutes = require('./routes/user.route')
const writeLog = require('./middlewares/log.middleware')
const {restrictToLoggedInUserOnly, getCurrentUser} = require('./middlewares/auth.middleware')

// Setting up EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/', getCurrentUser, writeLog, staticRoutes)
app.use('/message', restrictToLoggedInUserOnly, messageRoutes)
app.use('/user', userRoutes)

// Starting the server and MongoDB connection
app.listen(port, () => {
    connectDB(process.env.MONGODB_URI)
        .then(() => console.log(`Server is running on http://localhost:${port}`))
})