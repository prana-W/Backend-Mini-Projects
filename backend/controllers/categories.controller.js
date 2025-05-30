const Category = require('../models/category.model');

const handleCategories = async (req, res) => {

    try {
        const allCategories = await Category.find({})

        res.json(allCategories)

    } catch (err) {
        res.json({'status': 'error', 'message': 'There was an error while fetching categories', 'error': err.message})
    }

}

const handleCategoryById = async (req, res) => {
    try {
        const result = await Category.find({_id: req.params.id})
        return res.status(201).json(result)
    } catch (err) {
        return res.json({
            status: 'error',
            message: `There was an error fetching category with id ${req.params.id}`,
            error: err.message
        });
    }
}

const handleCreateCategory = async (req, res) => {

    const body = req.body;

    try {
        const result = await Category.create({
            name: body.name,
            color: body.color,
            notes: body.notes
        })

        console.log(result)

        return res.json({status: 'success', message: `Category with ${result._id} id was created successfully!`});

    } catch (err) {
        return res.status(409).json({status: 'error', message: err.message});
    }

}

const handleUpdateCategoryById = async (req, res) => {

    try {
        await Category.findByIdAndUpdate(req.params.id, req.body)

        return res.json({status: 'success', message: `Category with ${req.params.id} id was updated successfully!`});
    } catch (err) {
        return res.json({status: 'error', message: 'There was an error while updating category', error: err.message});
    }

}

const handleDeleteCategoryById = async (req, res) => {
    try {

        const result = await Category.findByIdAndDelete(req.params.id)
        if(!result) {
            return res.status(404).json({status: 'error', message: `Category with ${req.params.id} id was not found!`});
        }
        return res.json({status: 'success', message: `Category with ${req.params.id} id was deleted successfully!`});
    } catch (err) {
        return res.json({status: 'error', message: 'There was an error while deleting category', error: err.message});
    }

}


module.exports = {
    handleCategories,
    handleCreateCategory,
    handleUpdateCategoryById,
    handleDeleteCategoryById,
    handleCategoryById
}