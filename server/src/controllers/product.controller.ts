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

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    successResponse(res, product, 200, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getProductsByCategory(
      req.params.category
    );
    successResponse(res, products, 200, "Products fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const toggleFeaturedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.toggleFeaturedProducts(req.params.id);
    successResponse(res, product, 200, "Product featured status toggled");
  } catch (error) {
    next(error);
  }
};

export const getRecommendedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getRecommendedProducts();
    successResponse(res, products, 200, "Recommended products fetched");
  } catch (error) {
    next(error);
  }
};
