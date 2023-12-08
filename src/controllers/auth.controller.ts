import { RequestHandler } from "express";
import User from "../models/user.model";
import argon2 from "argon2";
import mongoose from "mongoose";
import { CustomError } from "../helpers/error.helper";
import { jwtSign } from "../services/jwt.services";
import passResetToken from "../helpers/pass.reset.token";
import passReset from "../models/passwordreset";



export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //check if user by the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError("user already exist", 402);
    }

    ///proceed to hash password
   const hashedPassword = await argon2.hash(password);

    //go ahead and register the new user
    const newUser = await User.create({ email, username,password : hashedPassword });

    /*await newUser.save();*/

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("iiiii")
    // chk if user by that mail exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    // verify password and chk if user exists

    if (
      !existingUser ||
      !(await argon2.verify(existingUser.password, password))
    ) {
      throw new CustomError("invalid credentials", 401);
    }

    // give the user a a login  token
    const token = jwtSign({ userId: existingUser.id });
    console.log(token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};



export const forgotPassword: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  //find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("No user by that email", 401);
  }

  //  generate a token for the user//
  const resetToken = passResetToken();

  //hash the token
//   const resetTokenHash = await argon2.hash(resetToken);

  //send to user via mail

  //save a record in db

  const resetRecord =  await passReset.create({
    user: user,
    resetToken: resetToken,
  });

  res.status(200).json({
    success: true,
    message: "A reset token has been sent o your email",
    data: resetRecord,
    resetToken:resetToken
  });
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newpassword } = req.body;
console.log(token)
    // const hashtokenInput = await argon2.hash(token.trim())

    // console.log(hashtokenInput)
    //check if owner of cuh token exist and token isnt expired
    const passResetDoc = await passReset
      .findOne({
        resetToken: token,
        expiresIn: { $gt: Date.now() },
      })
      .populate("user");

    if (!passResetDoc) {
      throw new CustomError("invalid or expired token", 401);
    }

    //get user details from the passresetrecord
    const { user } = passResetDoc;

    // Check if user information is available
    if (!user || !user._id) {
      throw new CustomError("User information not available", 401);
    }

    // Hash the new password using argon2
    const hashedPassword = await argon2.hash(newpassword);

    // Update user's password

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    // Send reset success email

    // Respond with success message and updated user data
    res.status(201).json({
      message: "Password reset successful",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = async (req, res, next) => {};
