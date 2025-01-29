const express = require('express');
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController.js');

const router = express.Router();

// Define POST route for adding a category
router.post('/addcategory', addCategory);
router.get('/getallcategories',getAllCategories)
router.get('/getcategorydetails/:id',getCategoryDetails)
router.get('/getcategorydetails',getCategoryDetails)
router.put('/updatecategory/:id',updateCategory)
router.delete('/deletecategory/:id',deleteCategory)
module.exports = router;
