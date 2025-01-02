import express from "express";
import { registrationSchema } from "../types/auth.type";
import { validateData } from "../middleware/validateDataMiddleware";
import { registerController } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateData(registrationSchema), // Middleware to validate the payload
  registerController // Controller to handle the business logic
);

export default authRouter;
