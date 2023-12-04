import { Router, RequestHandler } from "express";
import { createTodo ,deleteTodo,getTodo, getTodos, updateTodo} from "../controllers/todo.controller";

const router = Router();

// auth routes
router.post("/auth/register");
router.post("/auth/login");
router.post("/auth/forgot-password");
router.post("/auth/reset-password/:token");
router.post("/auth/logout");



// TODO ROUTES
router.get("/todos/:userId",getTodos);
router.get("/todo/:id",getTodo);
router.post("/todo",createTodo);
router.put("/todo/:id",updateTodo);
router.delete("/todo/:id",deleteTodo);



export default router;
