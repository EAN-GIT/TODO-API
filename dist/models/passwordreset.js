"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passwordResetSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    resetToken: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        default: new Date(Date.now() + 60 * 60 * 1000),
    },
}, { timestamps: true });
const passReset = (0, mongoose_1.model)("passReset", passwordResetSchema);
exports.default = passReset;
