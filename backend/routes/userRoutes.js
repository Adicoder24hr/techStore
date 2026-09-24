import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";


const router = Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

export default router;