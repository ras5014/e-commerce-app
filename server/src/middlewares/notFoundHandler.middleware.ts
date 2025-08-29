import { Request, Response } from "express";
import { errorResponse } from "src/utils/responses";

export const notFoundHandler = (req: Request, res: Response) => {
  errorResponse(res, 404, "Resource not found");
};
