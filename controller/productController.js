const ProductModel=require("../models/productModel.js")

//add new product

exports.addProduct=async(req,res)=>{
  let productToAdd=new ProductModel({
    product_title:req.body.product_title,
    product_price:req.body.product_price,
    product_description:req.body.product_description,
    count_in_stock:req.body.count_in_stock,
    category:req.body.category
  })
  productToAdd=await productToAdd.save()
  if(!productToAdd){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send(productToAdd)
}