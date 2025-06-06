const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./connection')

const port = process.env.PORT || 8001

// Setting up EJS
app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/', staticRoute)

app.listen(port, () => {
    connectDB(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => {
            console.log(`MONGODB CONNECTION ERROR: ${err.message}`)});
})
