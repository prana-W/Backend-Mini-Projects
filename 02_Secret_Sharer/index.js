const express = require('express')
const app = express()
const port = process.env.PORT || 8001
require('dotenv').config()
const path = require('path')

// File Imports
const connectDB = require('./connection')
const staticRoutes = require('./routes/static.route')
const messageRoutes = require('./routes/message.route')
const userRoutes = require('./routes/user.route')

// Setting up EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.use('/', staticRoutes)
app.use('/message', messageRoutes)
app.use('/user', userRoutes) //todo: add a middleware to restrict access to logged in users only

// Starting the server and MongoDB connection
app.listen(port, () => {
    connectDB(process.env.MONGODB_URI)
        .then(() => console.log(`Server is running on http://localhost:${port}`))
})