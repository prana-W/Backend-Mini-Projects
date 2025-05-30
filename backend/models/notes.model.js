const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }]
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note