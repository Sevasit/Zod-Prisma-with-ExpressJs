import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.routes";
import prisma from "./prisma-client";
import dotenv from "dotenv";
import cors from "cors";
import { auth } from "./middleware/validateDataMiddleware";
import actuatorRouter from "./routes/actuator.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH POST PUT DELETE");
  }
  next();
});

app.use("/api/auth", authRouter);
app.use("/", actuatorRouter);

app.get("/", auth, async (req, res) => {
  const data = await prisma.employees.findMany({
    include: {
      department: {
        select: {
          department_name: true,
        },
      },
      countrie: {
        select: {
          country_name: true,
        },
      },
    },
  });
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ✈️`);
});
