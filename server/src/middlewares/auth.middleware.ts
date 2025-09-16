import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { Response, Request, NextFunction } from "express";
import { errorResponse } from "src/utils/responses.util.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      errorResponse(
        res,
        401,
        "Unauthorized! Please login to access this route"
      );
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      /*The minus sign (-) before password means "do not include this field" in the result.
        So, the user object will have all fields except password */
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        errorResponse(res, 401, "Unauthorized! User not found");
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        errorResponse(res, 401, "Session expired! Please login again");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req?.user?.role === "admin") {
    next();
  } else {
    errorResponse(res, 403, "Forbidden! You do not have access to this route");
  }
};
