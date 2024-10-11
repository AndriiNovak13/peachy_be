import { NextFunction, Request, Response } from "express";

import { UserService } from "../services";

import { QueryParams } from "@/shared/types";
import { UserResponse } from "../shared/types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getMany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserResponse> | void> => {
    try {
      const result = await this.userService.getMany(
        req.query as unknown as QueryParams
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserResponse> | void> => {
    try {
      const result = await this.userService.get(req.params.userId);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserResponse> | void> => {
    try {
      const result = await this.userService.create(req.body);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserResponse> | void> => {
    try {
      const result = await this.userService.update(req.params.userId, req.body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void> | void> => {
    try {
      const result = await this.userService.delete(req.params.userId);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
