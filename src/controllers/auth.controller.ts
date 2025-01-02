import { Request, Response } from "express";

export const registerController = (req: Request, res: Response) => {
  // Handle  registration logic using validated data from req.body
  res.json({ message: "registered successfully", data: req.body });
};

export const loginController = (req: Request, res: Response) => {
  // Handle  login logic using validated data from req.body
  res.json({ message: "logged in successfully", data: req.body });
};
