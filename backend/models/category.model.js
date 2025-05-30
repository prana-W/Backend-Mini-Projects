const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        default: '#ffffff'
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        default: []
    }]

})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;