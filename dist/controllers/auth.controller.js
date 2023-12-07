"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const argon2_1 = __importDefault(require("argon2"));
const error_helper_1 = require("../helpers/error.helper");
const jwt_services_1 = require("../services/jwt.services");
const pass_reset_token_1 = __importDefault(require("../helpers/pass.reset.token"));
const passwordreset_1 = __importDefault(require("../models/passwordreset"));
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //check if user by the email already exists
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            throw new error_helper_1.CustomError("user already exist", 402);
        }
        ///proceed to hash password
        const hashedPassword = await argon2_1.default.hash(password);
        //go ahead and register the new user
        const newUser = await user_model_1.default.create({ email, username, password: hashedPassword });
        /*await newUser.save();*/
        res.status(201).json({
            success: true,
            data: newUser,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // chk if user by that mail exists
        const existingUser = await user_model_1.default.findOne({ email });
        console.log(existingUser);
        // verify password and chk if user exists
        if (!existingUser ||
            !(await argon2_1.default.verify(existingUser.password, password))) {
            throw new error_helper_1.CustomError("invalid credentials", 401);
        }
        // give the user a a login  token
        const token = (0, jwt_services_1.jwtsign)({ userId: existingUser.id });
        console.log(token);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    //find user by email
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw new error_helper_1.CustomError("No user by that email", 401);
    }
    //  generate a token for the user//
    const resetToken = (0, pass_reset_token_1.default)();
    //hash the token
    //   const resetTokenHash = await argon2.hash(resetToken);
    //send to user via mail
    //save a record in db
    const resetRecord = await passwordreset_1.default.create({
        user: user,
        resetToken: resetToken,
    });
    res.status(200).json({
        success: true,
        message: "A reset token has been sent o your email",
        data: resetRecord,
        resetToken: resetToken
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newpassword } = req.body;
        console.log(token);
        // const hashtokenInput = await argon2.hash(token.trim())
        // console.log(hashtokenInput)
        //check if owner of cuh token exist and token isnt expired
        const passResetDoc = await passwordreset_1.default
            .findOne({
            resetToken: token,
            expiresIn: { $gt: Date.now() },
        })
            .populate("user");
        if (!passResetDoc) {
            throw new error_helper_1.CustomError("invalid or expired token", 401);
        }
        //get user details from the passresetrecord
        const { user } = passResetDoc;
        // Check if user information is available
        if (!user || !user._id) {
            throw new error_helper_1.CustomError("User information not available", 401);
        }
        // Hash the new password using argon2
        const hashedPassword = await argon2_1.default.hash(newpassword);
        // Update user's password
        const updatedUser = await user_model_1.default.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
        // Send reset success email
        // Respond with success message and updated user data
        res.status(201).json({
            message: "Password reset successful",
            data: updatedUser,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.resetPassword = resetPassword;
const logout = async (req, res, next) => { };
exports.logout = logout;
