const express = require('express')
const {
    handleNotes,
    handleFilteredNotes,
    handleCreateNote,
    handleUpdateNoteById,
    handleDeleteNoteById,
    handleNoteById
} = require('../controllers/notes.controller')

const router = express.Router()

router.route('/')
    .get(handleNotes)
    .post(handleCreateNote)

router.route('/:id')
    .get(handleNoteById)
    .patch(handleUpdateNoteById)
    .delete(handleDeleteNoteById)

module.exports = router