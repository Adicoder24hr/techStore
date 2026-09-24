import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { validate } from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "../validators/productValidator.js";


const router = Router();

router.post("/", verifyToken, isAdmin, validate(createProductSchema), createProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.put("/:id", verifyToken, isAdmin, validate(updateProductSchema), updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;