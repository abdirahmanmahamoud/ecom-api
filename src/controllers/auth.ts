import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.send("login route");
};

export const signup = (req: Request, res: Response) => {
  res.send("signup route");
};