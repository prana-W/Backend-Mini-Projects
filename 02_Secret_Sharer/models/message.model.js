const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Secret Message'
    },
    message: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    maxAllowedViews: {
        type: Number,
        default: 2
    },
    currentViews: {
        type: Number,
        default: 0
    },
    expiresIn: {
        type: Number,
        default: 5
    },
    createdBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User'
        type: String,
        required: true
    },
    accessedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message