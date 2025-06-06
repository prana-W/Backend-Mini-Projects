const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdSecretMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    receivedSecretMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]

}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User