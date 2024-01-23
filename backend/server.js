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
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Body parser middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
//app.use(notFound);

const __dirname = path.resolve(); //set __dirname to current directory

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(port, () => console.log(`Server running on port ${port}`));
