"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_helper_1 = require("../helpers/error.helper");
const main_config_1 = __importDefault(require("../config/main-config"));
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof error_helper_1.CustomError) {
        return res.status(err.statuscode).json({
            success: false,
            message: err.message,
            error_code: err.statuscode,
            stack: main_config_1.default.server.mode === "development" ? err.stack : {},
        });
    }
    return res.status(500).json({
        success: false,
        message: err.message,
        // stack: config.server.mode === "development" ? err.stack : {}
    });
};
exports.default = ErrorHandler;
