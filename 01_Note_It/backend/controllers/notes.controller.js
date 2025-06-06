const Note = require('../models/notes.model');

const handleNotes = async (req, res) => {

    try {
        let allData;

        if (req.query.archived == 'true' || req.query.archived == 'false') allData = await Note.find({ isArchived: req.query.archived })
        else allData = await Note.find({});

        return res.json(allData);

    }
    catch(err) {
    return res.json({status: 'error', message: 'There was an error fetching notes', error: err.message});
    }
}

const handleNoteById = async (req, res) => {
    try {
        const result = await Note.find({_id: req.params.id})
        return res.json (result)
    }
    catch(err) {
        return res.json({status: 'error', message: `There was an error fetching note with id ${req.params.id}`, error: err.message});
    }
}


const handleFilteredNotes = async (req, res) => {

}

const handleCreateNote = async (req, res) => {
    const body = req.body;

    try {
        const result = await Note.create({
            title: body.title,
            content: body.content,
            isArchived: body.isArchived,
            categories: body.categories,

        })

        return res.status(201).json({status: 'success', message: `Note with ${result._id} id was created successfully!`})


    } catch (err) {
        return res.status(409).json({status: 'error', message: err})
    }


}

const handleUpdateNoteById = async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, req.body)

        return res.json({status: 'success', message: `Note with ${req.params.id} id was updated successfully!`})
    }
    catch (err){
        return res.json({status: 'error', message: `There was an error updating note with id ${req.params.id}`, error: err.message})
    }
}

const handleDeleteNoteById = async (req, res) => {
 try {

     const result = await Note.findByIdAndDelete(req.params.id)
     if(!result) {
         return res.status(404).json({status: 'error', message: `Note with id ${req.params.id} does not exist!`})
     }

     return res.json({status: 'success', message: `Note with ${req.params.id} id was deleted successfully!`})
 }
 catch (err){
        return res.json({status: 'error', message: `There was an error deleting note with id ${req.params.id}`, error: err.message})
 }

}
module.exports = {
    handleNotes,
    handleFilteredNotes,
    handleCreateNote,
    handleUpdateNoteById,
    handleDeleteNoteById,
    handleNoteById
}