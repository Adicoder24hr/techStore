import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { addToCart, decreaseQuantity, getCart, increaseQuantity, removeFromCart } from "../controllers/cartController.js";


const router = Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/remove", verifyToken, removeFromCart);
router.patch("/increase/:productId", verifyToken, increaseQuantity);
router.patch("/decrease/:productId", verifyToken, decreaseQuantity);

export default router;