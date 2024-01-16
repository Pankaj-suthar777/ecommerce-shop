import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import product from "./data/product.js";
import User from "./models/userModel.js";
import Product from "./Models/productModel.js";
import Order from "./Models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = product.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
  } catch (error) {
    console.error(`${error}`);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
