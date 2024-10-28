import { Request, Response } from "express";
import db from "../../lib/db";

type order = {
  product: {
    id: string;
    quantity: number;
  }[];
  phone: string;
  address: string;
  price: number;
};

export const CreateOrder = async (req: Request, res: Response) => {
  const { product, phone, address, price } = req.body as order;

  const userId = req.userId;

  if (!product || !phone || !address || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const productCheck = await db.product.findMany({
    where: {
      id: {
        in: product.map((p) => p.id),
      },
    },
  });

  if (product.length !== productCheck.length) {
    return res.status(400).json({ message: "Invalid product" });
  }

  const order = await db.order.create({
    data: {
      phone,
      address,
      price,
      type: "processing",
      user: {
        connect: { id: userId },
      },
      products: {
        create: product.map((p) => ({
          product: {
            connect: { id: p.id },
          },
          quantity: p.quantity,
        })),
      },
    },
  });

  return res.status(200).json({ message: "Order created", order });
};

export const getOrderByUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const orders = await db.order.findMany({
    where: {
      userId,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  return res.status(200).json(orders);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!id || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const order = await db.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  await db.order.update({
    where: {
      id,
    },
    data: {
      type,
    },
  });

  return res.status(200).json({ message: "Order updated" });
};

export const allOrders = async (req: Request, res: Response) => {
  const orders = await db.order.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return res.status(200).json(orders);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const order = await db.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  await db.orderProduct.deleteMany({
    where: {
      orderId: order.id,
    },
  });

  await db.order.delete({
    where: {
      id,
    },
  });
  return res.status(200).json({ message: "Order deleted" });
};

export const orderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  const orders = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return res.status(200).json(orders);
};
