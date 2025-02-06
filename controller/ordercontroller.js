const OrderItemsModel = require('../models/OrderItemsModel');
const OrderModel = require('../models/OrderModel');


exports.placeOrder = async (req, res) => {
  try {
    //orderItems:[{product1,quantity1},{product2,quantity2}]

    let orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItemObj) => {
        let orderItemToAdd = await OrderItemsModel.create({
          product: orderItemObj.product,
          quantity: orderItemObj.quantity,
        });

        if (!orderItemToAdd) {
          return res.status(400).json({ error: "Something went wrong" });
        }

        return orderItemToAdd._id;
      })
    );

    let individualTotals = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        let orderItem = await OrderItemsModel.findById(orderItemId).populate('product', 'product_price');
        return orderItem.product.product_price * orderItem.quantity;
      })
    );

    let total = individualTotals.reduce((a, c) => a + c, 0);

    let orderToPlace = await OrderModel.create({
      orderItems: orderItemsIds,
      total: total,
      user: req.body.user,
      street_address: req.body.street_address,
      alternate_street_address: req.body.alternate_street_address,
      city: req.body.city,
      postal_code: req.body.postal_code,
      state: req.body.state,
      country: req.body.country,
      phone: req.body.phone,
    });

    if (!orderToPlace) {
      return res.status(400).json({ error: "Failed to place order." });
    }

    res.send(orderToPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrderDetails=async (req,res)=>{
  let order=await OrderModel.findById(req.params.id).populate('user','username').populate({path:"orderItems",populate:{path:'product',populate:'category'}})
  if(!order){
    return res.status(400).json({eroor:"Something went wrong"})
  }
}

exports.getAllOrderDetails=async (req,res)=>{
  let order=await OrderModel.findById(req.params.id).populate('user','username').populate({path:"orderItems",populate:{path:'product',populate:'category'}})
  if(!order){
    return res.status(400).json({eroor:"Something went wrong"})
  }
}