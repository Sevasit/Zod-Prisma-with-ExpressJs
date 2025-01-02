import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.routrs";
import prisma from "./prisma-client";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(bodyParser.json());

app.use("/api/auth", authRouter);

app.get("/", async (req, res) => {
  const data = await prisma.employees.findMany();
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ✈️`);
});
