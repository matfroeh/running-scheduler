import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) throw new ErrorResponse("User already exists", 400);

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await User.create({ ...body, password: hashedPassword });
    if (!newUser) throw new ErrorResponse("Error creating user", 500);

    const secret = process.env.JWT_SECRET; 
    const payload = { userId: newUser.id, userRole: newUser.role }; 
    const tokenOptions = { expiresIn: "6d" }; 
    const token = jwt.sign(payload, secret, tokenOptions);
    // const checkCookieValue = true;

    const isProduction = process.env.NODE_ENV === "production";
    const tokenCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      // overwrite: true,
    };
    // const checkCookieOptions = {
    //   expires: new Date(Date.now() + 60 * 60 * 10000),
    //   sameSite: isProduction ? "None" : "Lax",
    //   secure: isProduction,
    //   // overwrite: true,
    // };

    const { userName, email } = newUser;
    res
      .cookie("auth", token, tokenCookieOptions)
      // .cookie("checkCookie", checkCookieValue, checkCookieOptions); // not used in the frontend by now
    res.status(201).json({ success: "User successfully created.", data: {userName, email } });
  } catch (error) {
    next(error);
  }
});

export const login = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email }).select("+password");
    if (!user) throw new ErrorResponse("Invalid credentials", 401);

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) throw new ErrorResponse("Invalid credentials", 401);

    const token = jwt.sign(
      { userId: user.id, userRole: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "6d",
      }
    );
    // const checkCookieValue = true;

    const isProduction = process.env.NODE_ENV === "production";
    const tokenCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      // overwrite: true,
    };
    // const checkCookieOptions = {
    //   expires: new Date(Date.now() + 60 * 60 * 10000),
    //   sameSite: isProduction ? "None" : "Lax",
    //   secure: isProduction,
    //   // overwrite: true,
    // };
    
    const { userName, email } = user;
    res
      .cookie("auth", token, tokenCookieOptions)
      // .cookie("checkCookie", checkCookieValue, checkCookieOptions);
    res.status(200).json({ success: "User successfully logged in.", data: { userName, email } });
  } catch (error) {
    next(error);
  }
});

export const me = asyncHandler(async (req, res, next) => {
  try {
    const { userId, userRole } = req; // This is coming from the verifyTokenMiddleware

    const user = await User.findById(userId).select("-password").populate("equipmentList");
    if (!user) throw new ErrorResponse("Invalid credentials", 401);

    const { userName, email, equipmentList } = user;

    res.status(200).json({ userId, userName, email, userRole, equipmentList });
  } catch (error) {
    next(error);
  }
});

export const logout = asyncHandler(async (req, res, next) => {
  try {
    res
      .clearCookie("auth")
      .clearCookie("checkCookie")
      .json({ success: "User successfully logged out." });
  } catch (error) {
    next(error);
  }
});
