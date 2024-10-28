import { Request, Response } from "express";
import db from "../../lib/db";

export const getProducts = async (req: Request, res: Response) => {
  const products = await db.product.findMany();
  return res.status(200).json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await db.product.create({
    data: {
      name,
      description,
      price,
      image,
    },
  });

  return res.status(200).json({ message: "product created", product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id passed is required" });
  }

  if (!name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(400).json({ message: "product not found" });
  }

  const updatedProduct = await db.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      price,
      image,
    },
  });

  return res
    .status(200)
    .json({ message: "product updated", product: updatedProduct });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await db.product.findUnique({
    where: {
      id,
    },
  });

  if (!products) {
    return res.status(400).json({ message: "product not found" });
  }

  return res.status(200).json(products);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id passed is required" });
  }
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(400).json({ message: "product not found" });
  }

  await db.product.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ message: "product deleted" });
};
