import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { match } from "path-to-regexp";
import * as express from "express";
import db from "./db";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

type DecodedToken = {
  id: number;
  exp: number;
  iat: number;
};

const adminRoutes = [
  { method: "POST", url: "/product" },
  { method: "PUT", url: "/product/:id" },
  { method: "DELETE", url: "/product/:id" },
];

const isAdminRoute = (req: Request): boolean => {
  return adminRoutes.some((route) => {
    const matchRoute = match(route.url, { decode: decodeURIComponent });
    const result = matchRoute(req.originalUrl);
    return req.method === route.method && result !== false;
  });
};

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const { id, exp } = decoded;

    if (exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (isAdminRoute(req)) {
      const user = await db.user.findUnique({ where: { id } });

      if (user?.role !== "admin") {
        return res.status(401).json({ message: "not admin" });
      }
      req.userId = id as number;
      next();
    } else {
      req.userId = id as number;
      next();
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
