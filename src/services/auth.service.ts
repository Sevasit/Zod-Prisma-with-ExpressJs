import prisma from "../prisma-client";
import { RegistrationSchema, ReqLoginSchema } from "../types/auth.type";

import {
  encryptPassword,
  signJwt,
  validatePassword,
} from "../utils/function.utils";

export const registerService = async (payload: RegistrationSchema) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    hireDate,
    passwordEmployee,
  } = payload;

  const user = await prisma.employees.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await encryptPassword(passwordEmployee);
  const newUser = await prisma.employees.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      hire_date: hireDate,
      password_employee: hashedPassword,
    },
  });
  return {
    firstName: newUser.first_name,
    lastName: newUser.last_name,
    email: newUser.email,
    phoneNumber: newUser.phone_number,
    hireDate: newUser.hire_date,
  };
};

export const loginService = async (payload: ReqLoginSchema) => {
  const { email, password } = payload;

  const user = await prisma.employees.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password_employee) {
    throw new Error("Password is missing");
  }

  const isPasswordValid = await validatePassword(
    password,
    user.password_employee
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = signJwt(user);

  return {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone_number,
    hireDate: user.hire_date,
    token,
  };
};
