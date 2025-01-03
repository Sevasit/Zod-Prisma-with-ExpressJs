import express from "express";
import { registrationSchema, reqLoginSchema } from "../types/auth.type";
import { validateData } from "../middleware/validateDataMiddleware";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateData(registrationSchema),
  registerController
);
authRouter.post("/login", validateData(reqLoginSchema), loginController);

export default authRouter;
