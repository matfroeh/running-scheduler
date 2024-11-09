import { Router } from "express";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";
import validateJOI from "../middleware/validateJOI.js";
import { signUp, login, me, logout } from "../controllers/authController.js";
import { userSchema, loginSchema } from "../joi/schemas.js";

const authRouter = Router();

// authRouter.route('/signup').post(validateJOI(userSchema), signUp); 
authRouter.route('/login').post(validateJOI(loginSchema), login);
authRouter.route('/me').get(verifyTokenMiddleware, me);
authRouter.route('/logout').get(verifyTokenMiddleware, logout);

export default authRouter;