import { Request, Response } from "express";
import db from "../../lib/db";
import bcrypt from "bcrypt";

export const login = (req: Request, res: Response) => {
  res.send("login route");
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const emailCheck = await db.user.findUnique({ where: { email } });

  if (emailCheck) {
    return res
      .status(400)
      .json({ message: "An user with this email already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // Todo: generate token

  return res.status(200).json({ message: "user created successfully", user });
};
