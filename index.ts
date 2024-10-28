import express from "express";
import authRoutes from "./src/routes/auh";
import productsRoutes from "./src/routes/products";
import orderRouters from "./src/routes/order";
import userRouter from "./src/routes/user";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/auth", authRoutes);
app.use("/product", productsRoutes);
app.use("/order", orderRouters);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
