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
