import express from "express";
import { UserController } from "../controllers/users.controller";
import { checkOwnershipOrAdmin, verifyJWT, verifyRole } from "../middleware/auth.middleware";
import { signinSchema, signupSchema } from "../validation/auth.validation";
import { validateRequest } from "../middleware/Request";

const router = express.Router();

// Route đăng ký
router.post("/register",validateRequest(signupSchema),UserController.signup);

// Route đăng nhập
router.post("/login",validateRequest(signinSchema), UserController.login);

// Route lấy danh sách thông tin người dùng hiện tại

router.get("/", verifyJWT, verifyRole("admin"), UserController.getAll);

// Router lấy profile chi tiết người dùng
router.get("/profile", verifyJWT, UserController.getMe);

// router cập nhật (admin)
router.put("/:id", verifyJWT, checkOwnershipOrAdmin, UserController.update);

// router xóa (admin)
router.delete("/:id",verifyJWT, verifyRole("admin"), UserController.delete);

export default router;