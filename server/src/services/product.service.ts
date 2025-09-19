import cloudinary from "src/lib/cloudinary.js";
import redis from "src/lib/redis.js";
import Product from "src/models/product.model.js";
import { CreateProductInput } from "src/types/product.type.js";

export const getAllProducts = async () => {
  return await Product.find();
};

export const getFeaturedProducts = async () => {
  /*
  In Mongoose, calling .lean() after a query (like Product.find(...)) tells Mongoose to return plain JavaScript objects instead of full Mongoose documents.
  Benefits of .lean():

  Performance: Lean queries are faster and use less memory because they skip creating Mongoose document instances.
  Plain objects: The result is a plain JS object, not a Mongoose model instance (so no document methods like .save()).
  
  Use .lean() when you only need to read data and don’t need Mongoose document methods.
  */
  let featuredProducts: any = await redis.get("feature_products");

  if (featuredProducts) {
    return JSON.parse(featuredProducts);
  }
  featuredProducts = await Product.find({ isFeatured: true }).lean();
  // Caching
  await redis.set("feature_products", JSON.stringify(featuredProducts));
  return featuredProducts;
};

export const createProduct = async (productData: CreateProductInput) => {
  const { name, description, price, image, category, isFeatured } = productData;

  let cloudinaryResponse = null;
  if (image) {
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
  }

  const product = await Product.create({
    name,
    description,
    price,
    image: cloudinaryResponse?.secure_url ?? "",
    category,
    isFeatured,
  });

  return product;
};

export const deleteProduct = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.image) {
    const segments = product.image.split("/");
    const publicIdWithExtension = segments[segments.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];
    await cloudinary.uploader.destroy(`products/${publicId}`);
  }

  await Product.findByIdAndDelete(productId);
  return product;
};

export const getProductsByCategory = async (category: string) => {
  return await Product.find({ category: category });
};

export const toggleFeaturedProducts = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  product.isFeatured = !product.isFeatured;
  await product.save();

  /* 
    Update Redis cache
    The lean() method  is used to return plain JavaScript objects instead of
    full Mongoose documents. This can significantly improve performance 
  */
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  await redis.set("feature_products", JSON.stringify(featuredProducts));
  return product;
};

export const getRecommendedProducts = async () => {
  /*
    Randomly picks 3 documents using $sample: { size: 3 }.
    Returns only selected fields for each picked product 
    via $project: _id, name, description, image, and price (everything else is excluded).
  */
  const products = await Product.aggregate([
    { $sample: { size: 3 } }, // Adjust the size as needed
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        image: 1,
        price: 1,
      },
    },
  ]);

  return products;
};
