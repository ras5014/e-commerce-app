import { Request, Response, NextFunction } from "express";
import * as cartService from "src/services/cart.service.js";
import { successResponse } from "src/utils/responses.util.js";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await cartService.addToCart(req.user, req.body.productId);
    successResponse(res, cartItems, 200, "Product added to cart");
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await cartService.removeFromCart(
      req.user,
      req.body.productId
    );
    successResponse(res, cartItems, 200, "Product removed from cart");
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await cartService.updateQuantity(
      req.user,
      req.params.productId,
      req.body.quantity
    );
    successResponse(res, cartItems, 200, "Cart updated successfully");
  } catch (error) {
    next(error);
  }
};

export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await cartService.getCartItems(req.user);
    successResponse(res, cartItems, 200, "Cart items retrieved successfully");
  } catch (error) {
    next(error);
  }
};
