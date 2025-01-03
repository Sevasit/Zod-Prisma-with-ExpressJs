import { NextFunction, Request, Response } from "express";

const actuator = async (req: Request, res: Response, next: NextFunction) => {
  let data = {
    message: `add path '/health' to show service status.`,
  };
  res.send(data);
};

const healthy = async (req: Request, res: Response, next: NextFunction) => {
  let data = {
    status: "healthy",
  };
  res.send(data);
};

export { healthy, actuator };
