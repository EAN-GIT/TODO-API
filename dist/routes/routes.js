"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
// auth routes
router.post("/auth/register");
router.post("/auth/login");
router.post("/auth/forgot-password");
router.post("/auth/reset-password/:token");
router.post("/auth/logout");
// TODO ROUTES
router.get("/todos/:userId", todo_controller_1.getTodos);
router.get("/todo/:id", todo_controller_1.getTodo);
router.post("/todo", todo_controller_1.createTodo);
router.put("/todo/:id", todo_controller_1.updateTodo);
router.delete("/todo/:id", todo_controller_1.deleteTodo);
exports.default = router;
