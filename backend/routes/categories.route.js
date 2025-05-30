const {
    handleCategories,
    handleCreateCategory,
    handleDeleteCategoryById,
    handleUpdateCategoryById,
    handleCategoryById
} = require('../controllers/categories.controller');
const router = require('express').Router();

router.route('/')
    .get(handleCategories)
    .post(handleCreateCategory)

router.route('/:id')
    .get(handleCategoryById)
    .patch(handleUpdateCategoryById)
    .delete(handleDeleteCategoryById)

module.exports = router;