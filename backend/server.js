import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
//import products from "./data/product.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import createCheckoutSession from "./api/checkout.js";

import webhook from "./api/webhook.js";
const port = process.env.PORT || 5000;
import cors from "cors";
const app = express();
app.use(cors({ origin: true }));
connectDB();

// stripe
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
app.post("/webhook", webhook);

// Body parser middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
//app.use(notFound);

app.post("/create-checkout-session", createCheckoutSession);

const __dirname = path.resolve(); //set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

if (process.env)
  app.listen(port, () => console.log(`Server running on port ${port}`));
