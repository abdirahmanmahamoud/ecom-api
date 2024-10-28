import { Request, Response } from "express";
import db from "../../lib/db";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ message: "role must be admin or user" });
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const updatedUser = await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return res.status(200).json({
    message: "user updated successfully",
    user: updatedUser,
  });
};
