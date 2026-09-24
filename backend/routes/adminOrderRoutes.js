import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllOrders, updateOrderStatus } from "../controllers/adminController.js";


const router = Router();

router.get("/", verifyToken, isAdmin, getAllOrders);
router.put("/:id", verifyToken, isAdmin, updateOrderStatus);

export default router;