const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const OrderSchema=new mongoose.Schema({
  orderItems:[{
    type:ObjectId,
    ref:"OrderItems",
    required:true
  }],
  user:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  total:{
    type:Number,
    required:true
  },
  street_address:{
    type:String,
    required:true
  },
  alternate_street_address:{
    type:String
  },
  city:{
    type:String
  },
  state:{
    type:String
  },
  postal_code:{
    type:String
  },
  country:{
    type:String
  },
  phone:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    required:true
  }

})

module.exports=mongoose.Model("Order",OrderSchema)