"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// auth routes
router.post("/auth/register", auth_controller_1.register);
router.post("/auth/login", auth_controller_1.login);
router.post("/auth/forgot-password", auth_controller_1.forgotPassword);
router.post("/auth/reset-password/:token", auth_controller_1.resetPassword);
router.post("/auth/logout", auth_controller_1.logout);
// TODO ROUTES
router.get("/todos/:userId", auth_middleware_1.authMiddleware, todo_controller_1.getTodos);
router.get("/todo/:id", auth_middleware_1.authMiddleware, todo_controller_1.getTodo);
router.post("/todo", auth_middleware_1.authMiddleware, todo_controller_1.createTodo);
router.put("/todo/:id", auth_middleware_1.authMiddleware, todo_controller_1.updateTodo);
router.delete("/todo/:id", auth_middleware_1.authMiddleware, todo_controller_1.deleteTodo);
exports.default = router;
