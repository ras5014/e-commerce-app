import Product from "src/models/product.model.js";
import { UserType } from "src/types/auth.type.js";
import { Document as MongooseDocument } from "mongoose";

export const addToCart = async (
  user: UserType & MongooseDocument,
  productId: string
) => {
  const existingCartItem = user.cartItems.find(
    (item) => item.productId.toString() === productId
  );

  if (existingCartItem) {
    // If the product already exists in the cart, increment its quantity
    existingCartItem.quantity += 1;
  } else {
    // If the product does not exist in the cart, add it with quantity 1
    user.cartItems.push({ productId, quantity: 1 });
  }

  // Save in mongoDB
  await user.save();
  return user.cartItems;
};

export const removeFromCart = async (
  user: UserType & MongooseDocument,
  productId: string
) => {
  if (!productId) {
    user.cartItems = [];
  } else {
    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );
  }
  await user.save();
  return user.cartItems;
};

export const updateQuantity = async (
  user: UserType & MongooseDocument,
  productId: string,
  quantity: number
) => {
  const existingItem = user.cartItems.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.productId.toString() !== productId
      );
      await user.save();
      return user.cartItems;
    }
    existingItem.quantity = quantity;
    await user.save();
    return user.cartItems;
  }
};

export const getCartItems = async (user: UserType & MongooseDocument) => {
  const products = await Product.find({ _id: { $in: user.cartItems } });

  // Add quantity to each product
  const cartItems = products.map((product) => {
    const item = user.cartItems.find(
      (cartItem) => cartItem.productId.toString() === product._id.toString()
    );
    return {
      ...product.toObject(),
      quantity: item ? item.quantity : 0,
    };
  });
  return cartItems;
};
