import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  return res.json({ message: "get products" });
};

export const createProduct = async (req: Request, res: Response) => {
  return res.json({ message: "create product" });
};

export const updateProduct = async (req: Request, res: Response) => {
  return res.json({ message: "update product" });
};

export const getProductById = async (req: Request, res: Response) => {
  return res.json({ message: "get product by id" });
};

export const deleteProduct = async (req: Request, res: Response) => {
  return res.json({ message: "delete product" });
};
