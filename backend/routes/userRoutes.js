import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  updateUserProfile,
  getUserProfile,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
