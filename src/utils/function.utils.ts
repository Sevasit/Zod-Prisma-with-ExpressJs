import { employees } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const signJwt = (user: employees) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
