const ProductModel = require("../models/productModel.js");
const fs = require("fs");
const path = require("path");

// ✅ Add New Product
exports.addProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }

        let productToAdd = new ProductModel({
            product_title: req.body.product_title,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            count_in_stock: req.body.count_in_stock,
            category: req.body.category,
            product_image: req.file.path
        });

        productToAdd = await productToAdd.save();

        if (!productToAdd) {
            return res.status(400).json({ error: "Something went wrong" });
        }

        res.send(productToAdd);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find().populate("category");
        res.send(products);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// ✅ Get Product Details
exports.getProductDetails = async (req, res) => {
    try {
        let product = await ProductModel.findById(req.params.id).populate("category", "category_name");

        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        res.send(product);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// ✅ Get Products by Category
exports.getProductsByCategory = async (req, res) => {
    try {
        let products = await ProductModel.find({ category: req.params.categoryId });

        if (!products.length) {
            return res.status(400).json({ error: "No products found in this category" });
        }

        res.send(products);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// ✅ Update Product
exports.updateProduct = async (req, res) => {
    try {
        let productToUpdate = await ProductModel.findById(req.params.id);
        if (!productToUpdate) {
            return res.status(400).json({ error: "Product not found" });
        }

        // Handle Image Update
        if (req.file && productToUpdate.product_image) {
            const oldImagePath = path.join(__dirname, "../", productToUpdate.product_image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log(`Deleted old image: ${oldImagePath}`);
            } else {
                console.warn(`File not found: ${oldImagePath}`);
            }
            productToUpdate.product_image = req.file.path;
        }

        // Update other fields
        const { product_title, product_price, product_description, count_in_stock, category, rating } = req.body;
        productToUpdate.product_title = product_title || productToUpdate.product_title;
        productToUpdate.product_price = product_price || productToUpdate.product_price;
        productToUpdate.product_description = product_description || productToUpdate.product_description;
        productToUpdate.count_in_stock = count_in_stock || productToUpdate.count_in_stock;
        productToUpdate.category = category || productToUpdate.category;
        productToUpdate.rating = rating || productToUpdate.rating;

        productToUpdate = await productToUpdate.save();

        res.send(productToUpdate);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

//  Delete Product
//  Delete Product with Image
exports.deleteProduct = async (req, res) => {
  try {
      let deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
          return res.status(400).json({ error: "Product not found" });
      }

      //  Delete product image if it exists
      if (deletedProduct.product_image) {
          const imagePath = path.join(__dirname, "../", deletedProduct.product_image);

          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
              console.log(`✅ Deleted image: ${imagePath}`);
          } else {
              console.warn(`⚠️ File not found: ${imagePath}`);
          }
      }

      res.json({ message: "✅ Product deleted successfully, including its image" });
  } catch (error) {
      console.error("❌ Error deleting product:", error);
      res.status(500).json({ error: "Something went wrong" });
  }
};
