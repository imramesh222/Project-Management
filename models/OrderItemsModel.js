const mongoose = require('mongoose');

const {ObjectId}=mongoose.Schema


const OrderItemsSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("OrderItems", OrderItemsSchema);
