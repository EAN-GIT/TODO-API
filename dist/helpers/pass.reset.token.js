"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function passResetToken() {
    return Math.floor(Math.random() * 10000).toString();
}
exports.default = passResetToken;
