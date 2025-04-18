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
    const tokenOptions = { expiresIn: "28d" };
    const token = jwt.sign(payload, secret, tokenOptions);
    // const checkCookieValue = true;

    const isProduction = process.env.NODE_ENV === "production";
    const tokenCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      expires: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days
      // overwrite: true,
    };
    // const checkCookieOptions = {
    //   expires: new Date(Date.now() + 60 * 60 * 10000),
    //   sameSite: isProduction ? "None" : "Lax",
    //   secure: isProduction,
    //   // overwrite: true,
    // };

    const { userName, email } = newUser;
    res.cookie("auth", token, tokenCookieOptions);
    // .cookie("checkCookie", checkCookieValue, checkCookieOptions); // not used in the frontend by now
    res.status(201).json({
      success: "User successfully created.",
      data: { userName, email },
    });
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
        expiresIn: "28d",
      }
    );
    // const checkCookieValue = true;

    const isProduction = process.env.NODE_ENV === "production";

    const tokenCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      expires: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days
      // path: "/", // Same path as used when setting
      // domain: "running-scheduler-backend.onrender.com",
    };
    // const checkCookieOptions = {
    //   expires: new Date(Date.now() + 60 * 60 * 10000),
    //   sameSite: isProduction ? "None" : "Lax",
    //   secure: isProduction,
    // };

    const { userName, email } = user;
    res.cookie("auth", token, tokenCookieOptions);
    // .cookie("checkCookie", checkCookieValue, checkCookieOptions);
    res.status(200).json({
      success: "User successfully logged in.",
      data: { userName, email },
    });
  } catch (error) {
    next(error);
  }
});

export const me = asyncHandler(async (req, res, next) => {
  try {
    const { userId, userRole } = req; // This is coming from the verifyTokenMiddleware

    const user = await User.findById(userId)
      .select("-password")
      .populate("equipmentList");
    if (!user) throw new ErrorResponse("Invalid credentials", 401);

    const { userName, email, equipmentList, profilePicture } = user;

    res.status(200).json({
      userId,
      userName,
      email,
      userRole,
      equipmentList,
      profilePicture,
    });
  } catch (error) {
    next(error);
  }
});

export const logout = asyncHandler(async (req, res, next) => {
  try {
    // Workaround to remove the cookie as there seems to be an issue when deployed on render
    res
      .cookie("auth", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0), // Immediate expiration to force removal
      })
      .json({ success: "User successfully logged out." });
    // res
    //   .clearCookie(
    //     "auth"
    //     //   {
    //     //   path: "/", // Same path as used when setting
    //     //   domain: "running-scheduler-backend.onrender.com", // Specify this if you set a custom domain
    //     // }
    //   )
    //   // .clearCookie("checkCookie")
    //   .json({ success: "User successfully logged out." });
  } catch (error) {
    next(error);
  }
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId).select("+password");
  if (!user) throw new ErrorResponse("Invalid credentials", 401);
  // console.log('user', user);

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  // console.log('isPasswordValid', isPasswordValid);

  if (!isPasswordValid) throw new ErrorResponse("Invalid credentials", 401);

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ success: "Password successfully changed." });
});
