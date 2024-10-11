import { Router } from "express";

import { UserController } from "../controllers";

import { validate } from "@/shared/middlewares";
import { userSchema } from "../shared/validators";

export const userRouter = Router();
const userController: any = new UserController();

userRouter.get("/", userController.getMany);
userRouter.get("/:userId", userController.get);
userRouter.post("/", validate(userSchema), userController.create);
userRouter.patch("/:userId", validate(userSchema), userController.update);
userRouter.delete("/:userId", userController.delete);
