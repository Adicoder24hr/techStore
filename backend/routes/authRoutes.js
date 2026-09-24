import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";


const router = Router();

router.post("/register",validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;