const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./connection')
const notesRouter = require('./routes/notes.route');
const categoriesRouter = require('./routes/categories.route');

// Middleware
app.use(express.urlencoded());
app.use(express.json());

// Routes
app.get ('/', (req, res) => {
    return res.status(200).send('Server is running!')
})
app.use ('/api/notes', notesRouter)
app.use('/api/categories', categoriesRouter)

// DB Connection and Server Start
connectDB(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`)
        })
    })