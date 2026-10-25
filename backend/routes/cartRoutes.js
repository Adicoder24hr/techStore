import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { addToCart, decreaseQuantity, getCart, increaseQuantity, removeFromCart } from "../controllers/cartController.js";
import { validate } from "../middlewares/validate.js";
import { addToCartSchema, removeFromCartSchema } from "../validators/cartValidator.js";


const router = Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, validate(addToCartSchema), addToCart);
router.delete("/remove", verifyToken, validate(removeFromCartSchema), removeFromCart);
router.patch("/increase/:productId", verifyToken, increaseQuantity);
router.patch("/decrease/:productId", verifyToken, decreaseQuantity);

export default router;