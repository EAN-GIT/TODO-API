"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("gdgdgddd")
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const main_config_1 = __importDefault(require("./config/main-config"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const db_config_1 = __importDefault(require("./config/db-config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
///connect t o database
(0, db_config_1.default)();
app.use(error_middleware_1.default);
app.listen(main_config_1.default.server.port, () => {
    console.log(`App is now running on port:${main_config_1.default.server.port}`);
});
