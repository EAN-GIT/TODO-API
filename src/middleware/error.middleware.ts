import { CustomError } from "../helpers/error.helper";
import { Request, Response, NextFunction } from "express";
import config from "../config/main-config";

const ErrorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message,
      error_code: err.statuscode,
      stack: config.server.mode === "development" ? err.stack : {},
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
    // stack: config.server.mode === "development" ? err.stack : {}
  });
};

export default ErrorHandler
