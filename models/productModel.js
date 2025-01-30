const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const productSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true,
      trim: true
    },
    product_price: {
      type: Number,
      required: true
    },
    product_description: {
      type: String,
      required: true,
      trim: true
    },
    count_in_stock: {
      type: Number,
      required: true,  // ❌ Removed `trim: true`
      min: 0           // ✅ Ensures stock count is never negative
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    product_image: {
      type: String,  // ✅ Stores the file path of the uploaded image
      required: true
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,   // ✅ Ensures rating is at least 1
      max: 5    // ✅ Ensures rating does not exceed 5
    }
  },
  { timestamps: true }
);

module.exports=mongoose.model("Product",productSchema)