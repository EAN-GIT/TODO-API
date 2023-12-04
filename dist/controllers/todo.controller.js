"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.getTodos = void 0;
const todo_model_1 = __importDefault(require("../models/todo.model"));
const error_helper_1 = require("../helpers/error.helper");
const getTodos = async (req, res, next) => {
    try {
        const allTodos = await todo_model_1.default.find();
        return res.status(201).json({
            success: true,
            data: allTodos
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getTodos = getTodos;
const getTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todofound = await todo_model_1.default.findById(id);
        //check if todood the id was not found
        if (!todofound) {
            throw new error_helper_1.CustomError("Todo not found", 402);
        }
        return res.status(200).json({
            success: true,
            data: todofound
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTodo = getTodo;
const createTodo = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;
        const newTodo = await todo_model_1.default.create({ title, description, completed });
        console.log(newTodo);
        if (newTodo) {
            return res.status(200).json({
                success: true,
                data: newTodo
            });
        }
        else {
            throw new error_helper_1.CustomError("Todo creation failed", 401);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const updatedTodo = await todo_model_1.default.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!updatedTodo) {
            throw new error_helper_1.CustomError("Todo item not found", 402);
        }
        return res.status(200).json({
            success: true,
            data: updatedTodo
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todoItem = await todo_model_1.default.findByIdAndDelete(id);
        //check if todood the id was not found
        if (!todoItem) {
            throw new error_helper_1.CustomError("Todo not found", 402);
        }
        return res.status(200).json({
            success: true,
            message: "Todo deeleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTodo = deleteTodo;
