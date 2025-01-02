import prisma from "../prisma-client";
import { RegistrationSchema, registrationSchema } from "../types/auth.type";
import * as bcrypt from "bcryptjs";

export const registerService = async (payload: RegistrationSchema) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    hireDate,
    passwordEmployee,
  } = payload;

  const hashedPassword = await bcrypt.hash(passwordEmployee, 10);
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
