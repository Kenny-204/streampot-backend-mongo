import express from "express";
import { signup, login, protect } from "../controllers/authController.js";
import { getUser } from "../controllers/userControllers.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/me").get(protect, getUser);

export default router;
