import { Request, Response, NextFunction } from "express";
import * as productService from "src/services/product.service.js";
import { successResponse } from "src/utils/responses.util.js";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getAllProducts();
    successResponse(res, products, 200, "Products fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const featuredProducts = await productService.getFeaturedProducts();
    successResponse(res, featuredProducts, 200, "Featured products fetched");
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.createProduct(req.body);
    successResponse(res, product, 201, "Product created successfully");
  } catch (error) {
    next(error);
  }
};
