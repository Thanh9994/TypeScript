import express from "express";
import { UserController } from "../controllers/users.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { signinSchema, signupSchema } from "../validation/auth.validation";
import { validateRequest } from "../middleware/Request";

const router = express.Router();

// Route đăng ký
router.post("/register",validateRequest(signupSchema),UserController.signup);

// Route đăng nhập
router.post("/login",validateRequest(signinSchema), UserController.login);

// Route lấy thông tin người dùng hiện tại
router.get("/", verifyJWT, UserController.getAll);

export default router;