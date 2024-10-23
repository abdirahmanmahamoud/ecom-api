import e, { Request, Response } from "express";
import db from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = ({ id }: { id: number }) => {
  const date = new Date();
  date.setDate(date.getDate() + 30);

  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  return { token, date };
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const { token, date } = generateToken({ id: user.id });

  return res.status(200).json({
    message: "user logged in successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      token,
      expires: date,
    },
  });
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

  const { token, date } = generateToken({ id: user.id });

  return res.status(200).json({
    message: "user created successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      token,
      expires: date,
    },
  });
};
