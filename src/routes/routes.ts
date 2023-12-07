import { Router, RequestHandler } from "express";
import { createTodo ,deleteTodo,getTodo, getTodos, updateTodo} from "../controllers/todo.controller";
import { forgotPassword, login, logout, register, resetPassword } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// auth routes
router.post("/auth/register", register);
router.post("/auth/login",login);
router.post("/auth/forgot-password",forgotPassword);
router.post("/auth/reset-password/:token",resetPassword);
router.post("/auth/logout",logout);



// TODO ROUTES
router.get("/todos/:userId",authMiddleware,getTodos);
router.get("/todo/:id",authMiddleware,getTodo);
router.post("/todo",authMiddleware,createTodo);
router.put("/todo/:id",authMiddleware,updateTodo);
router.delete("/todo/:id",authMiddleware,deleteTodo);



export default router;
