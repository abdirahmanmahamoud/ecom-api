import express from "express";
import authRoutes from "./src/routes/auh";
import productsRoutes from "./src/routes/products";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/auth", authRoutes);
app.use("/product", productsRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
