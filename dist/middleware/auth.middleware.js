"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_helper_1 = require("../helpers/error.helper");
const main_config_1 = __importDefault(require("../config/main-config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
        console.log(token);
        if (!token) {
            throw new error_helper_1.CustomError("Unauthorised:You have to be logged in", 403);
        }
        const jwtSecret = main_config_1.default.jwtServices.jwt_secret;
        console.log(jwtSecret);
        if (jwtSecret === undefined) {
            throw new error_helper_1.CustomError("JWT secret is not defined in the configuration.", 500);
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log("rrfff");
        if (!decoded) {
            throw new error_helper_1.CustomError("invalid  or expired token", 403);
        }
        // assiggn user to the request obj
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error(err);
        next(err);
    }
};
exports.authMiddleware = authMiddleware;
