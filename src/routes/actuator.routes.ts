import express from "express";
import { actuator, healthy } from "../controllers/actuator.controller";
const actuatorRouter = express.Router();

actuatorRouter.get("/actuator", actuator);
actuatorRouter.get("/health", healthy);

export default actuatorRouter;
