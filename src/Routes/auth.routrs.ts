import express from "express";

const authRouter = express.Router();

import { validateData } from "../middleware/validateDataMiddleware";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { registrationSchema, reqLoginSchema } from "../Types/auth.type";

authRouter.post(
  "/register",
  validateData(registrationSchema),
  registerController
);
authRouter.post("/login", validateData(reqLoginSchema), loginController);

export default authRouter;
