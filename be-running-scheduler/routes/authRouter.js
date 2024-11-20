import { Router } from "express";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";
import validateJOI from "../middleware/validateJOI.js";
import { signUp, login, me, logout, changePassword } from "../controllers/authController.js";
import { userSchema, loginSchema } from "../joi/userSchema.js";

const authRouter = Router();

authRouter.route('/signup').post(validateJOI(userSchema), signUp); 
authRouter.route('/login').post(validateJOI(loginSchema), login);
authRouter.route('/me').get(verifyTokenMiddleware, me).put(verifyTokenMiddleware, changePassword);
authRouter.route('/logout').get(logout);

export default authRouter;