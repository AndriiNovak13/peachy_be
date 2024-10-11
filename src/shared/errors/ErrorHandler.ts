/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || error,
    error: error.error || "Internal Server Error"
  });
};
