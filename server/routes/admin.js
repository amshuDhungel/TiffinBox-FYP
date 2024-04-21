import express from "express";
import { getAllUsers } from "../controllers/admin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
const router = express.Router();

router.route("/peoples").get(verifyToken, verifyAdmin, getAllUsers);

export default router;
