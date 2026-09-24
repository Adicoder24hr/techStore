import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getOrders, getSingleOrder, placeOrder } from "../controllers/orderController.js";


const router = Router();

router.post("/placeorder", verifyToken, placeOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getSingleOrder);

export default router;