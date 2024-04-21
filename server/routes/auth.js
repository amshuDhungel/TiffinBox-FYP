import express from "express";
import {
  deleteProfile,
  forgetPassword,
  login,
  logout,
  myProfile,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { followUser, getUserProfile, getUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.route("/logout").get(logout);
router.route("/follow/:id").get(verifyToken, followUser);
router.route("/update/password").put(verifyToken, updatePassword);
router.route("/update/profile").put(verifyToken, updateProfile);
router.route("/delete/me").delete(verifyToken, deleteProfile);
router.route("/me").get(verifyToken, myProfile);
router.route("/user/:id").get(verifyToken, getUserProfile);
router.route("/allusers").get(verifyToken, getUsers);
router.route("/forgot/password").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
