"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtsign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const main_config_1 = __importDefault(require("../config/main-config"));
const jwtsign = (body) => {
    if (!main_config_1.default.jwtServices.jwt_secret) {
        throw new Error("JWT secret is not defined in the configuration.");
    }
    const token = jsonwebtoken_1.default.sign(body, main_config_1.default.jwtServices.jwt_secret, { expiresIn: "54h" });
    return token;
};
exports.jwtsign = jwtsign;
