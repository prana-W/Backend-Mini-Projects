const express = require('express')
const app = express()
const port = process.env.PORT || 8001
require('dotenv').config()

// File Imports
const connectDB = require('./connection')
const staticRoutes = require('./routes/static.route')
const messageRoutes = require('./routes/message.route')

// Setting up EJS
app.set('view engine', 'ejs')
app.set('views', './views')

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.use('/', staticRoutes)
app.use('/message', messageRoutes)

// Starting the server and MongoDB connection
app.listen(port, () => {
    connectDB(process.env.MONGODB_URI)
        .then(() => console.log(`Server is running on http://localhost:${port}`))
})
