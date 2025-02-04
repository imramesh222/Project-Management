const OrderItemsModel=require('../models/OrderItemsModel')
const OrderModel=require('../models/OrderModel')

exports.placeOrder=async (req,res)=>{
  //orderItems:[{product1,quantity1},{product2,quantity2}]

  let orderItemsIds=await Promise.all(
    req.body.orderItems.map(async orderItemObjrderItemObj=>{
      orderItemToAdd=await OrderItemsModel.create({
        product:orderItemObj.product,
        quantity:orderItemObj.quantity
      })
      if(!orderItemToAdd){
        return res.status(400).json({error:"Something went wrong"})
      }
      return orderItemToAdd._id
    })
  )
  let individualTotals=await Promise.all(orderItemsId.map(async orderItemObj=>{
    let orderItemObj=await OrderItemsModel.findById(orderItemId).populate('product','product_price')
    return orderItemObj.product.product_price*orderItemObj.quantity
  })
)
return total=individualTotals.reduce((a,c)=>a+c)
}