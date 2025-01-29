const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const productSchema= new mongoose.Schema({
  product_title:{
    type:String,
    required:true,
    trim:true
  },
  product_price:{
    type:Number,
    required:true,
  },
  product_description:{
    type:String,
    required:true,
    trim:true
  },
  count_in_stock:{
    type:Number,
    required:true,
    trim:true
  },
  category:{
    type:ObjectId,
    ref:"Category",
    required:true
  },
  product_image:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    default:1
  }
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)