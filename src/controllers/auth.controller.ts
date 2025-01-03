import { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";
import { ResponseSchema } from "../types/auth.type";

export const registerController = async (req: Request, res: Response) => {
  try {
    const data = await registerService(req.body);
    const response: ResponseSchema = {
      success: true,
      message: "User registered successfully",
      data: data,
    };
    res.json(response);
  } catch (error) {
    const response: ResponseSchema = {
      success: false,
      message: (error as Error).message,
      data: null,
    };
    res.status(500).json(response);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const data = await loginService(req.body);
    const response: ResponseSchema = {
      success: true,
      message: "User logged in successfully",
      data: data,
    };
    res.json(response);
  } catch (error) {
    const response: ResponseSchema = {
      success: false,
      message: (error as Error).message,
      data: null,
    };
    res.status(500).json(response);
  }
};
