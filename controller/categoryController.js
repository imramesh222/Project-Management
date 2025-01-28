const Category = require('../models/categoryModel.js');

exports.addCategory = async (request, response) => {
  try {
    // Check if category_name is provided
    if (!request.body.category_name) {
      return response.status(400).json({ error: "Category name is required" });
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({
      category_name: request.body.category_name.trim(),
    });

    if (existingCategory) {
      return response.status(400).json({ error: "Category already exists" });
    }

    // Create a new category if it does not exist
    const category_new = await Category.create({
      category_name: request.body.category_name.trim(),
    });

    response.status(201).json({
      message: "Category created successfully",
      category: category_new,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};


exports.getAllCategories=async(req,res)=>{
  let categories=await Category.find()
  if(!categories){
    return res.status(404).json({error:"Something went wrong"})
  }
  res.send(categories)
}

exports.getCategoryDetails=async(req,res)=>{
  const id=req.params.id || req.query.id
  let category=await Category.findById(id)
  if(!category){
    return res.status(400).json({error:"Something went wrong."})
  }
  res.send(category)
}