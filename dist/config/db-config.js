"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const main_config_1 = __importDefault(require("./main-config"));
const dbUrl = main_config_1.default.database.dbUrl || "";
async function connectDatabase() {
    try {
        const options = {};
        await mongoose_1.default.connect(dbUrl, options);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = connectDatabase;
