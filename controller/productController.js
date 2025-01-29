const ProductModel=require("../models/productModel.js")

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
  // delete product
// exports.deleteProduct=(req,res)=>{
//   ProductModel.findByIdAndDelete(req.params.id)
//   .then(deletdProduct=>{
//     if(!deletdProduct){

//     return res.status(400).json({error:"Product deleted successfully."})
//     }
//     else{
//   res.send({message:"Product deleted successfully"})
//     }
//   })
//   .catch(error=>res.status(500).send(error))
  
// }
// }

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
