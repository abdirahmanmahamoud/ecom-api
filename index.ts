import express from "express";
import authRoutes from "./src/routes/auh";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
