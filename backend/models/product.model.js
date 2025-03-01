import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Product = new mongoose.model("Product", productSchema);

export default Product;
