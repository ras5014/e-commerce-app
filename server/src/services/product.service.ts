import Product from "src/models/product.model.js";

export const getAllProducts = async () => {
  return await Product.find();
};
