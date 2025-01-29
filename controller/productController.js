const ProductModel=require("../models/productModel.js")
const fs=require('fs')
//add new product

exports.addProduct=async(req,res)=>{
  if(!req.file){
    return res.status(400).json({error:"File is required"})
  }
  let productToAdd=new ProductModel({
    product_title:req.body.product_title,
    product_price:req.body.product_price,
    product_description:req.body.product_description,
    count_in_stock:req.body.count_in_stock,
    category:req.body.category,
    product_image:req.file?.path
  })
  productToAdd=await productToAdd.save()
  if(!productToAdd){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send(productToAdd)
}
//Get all products
exports.getAllProducts=async (req,res)=>{
  let products=await ProductModel.find().populate('category')
  if(!products){
    return res.status(400).json({error:"Something went worng"})
  }
  res.send(products)
}

//get products details
exports.getProductDetails=async (req,res)=>{
  let product=await ProductModel.find().populate('category',"category_name")
  if(!product){
    return res.status(400).json({error:"Something went worng"})
  }
  res.send(product)
}
//get products by category
exports.getProductsByCategory=async (req,res)=>{
  let products=await ProductModel.find({category:req.params.categoryId})
  if(!products){
    return res.status(400).json({error:"Something went worng"})
  }
  res.send(products)
}

//update product
exports.updateProduct=async (req,res)=>{
  let productToUpdate=await ProductModel.findById(req.params.id)
  if(!productToUpdate){
    return res.status(400).json({error:"Something went wrong"})
  }
  if(req.file){
    fs.unlinkSync(productToUpdate.product_image)
    productToUpdate.product_image=req.file.path
  }
  let{product_title,product_price,product_description,count_in_stock,category,rating}=req.body

  productToUpdate.product_title = product_title? product_title : productToUpdate.product_title
  productToUpdate.product_price = product_price? product_price : productToUpdate.product_price
  productToUpdate.product_description = product_description? product_description : productToUpdate.product_description
  productToUpdate.count_in_stock = count_in_stock? count_in_stock : productToUpdate.count_in_stock
  productToUpdate.category = category? category : productToUpdate.category
  productToUpdate.rating = rating? rating : productToUpdate.rating

  productToUpdate=await productToUpdate.save()

  if(!productToUpdate){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send(productToUpdate)

}





  // delete product
exports.deleteProduct = (req,res) =>{
  ProductModel.findByIdAndDelete(req.params.id)
  .then(deletedProduct=>{
      if(!deletedProduct){
          return res.status(400).json({error:'product not found'})
      }
      else{
          fs.unlinkSync(deletedProduct.product_image)
          res.send({message:'product is deleted successfully'})
      }
  })
  .catch(error=>res.status(500).send(error))
}
