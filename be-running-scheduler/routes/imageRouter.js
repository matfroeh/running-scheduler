import { Router } from "express";
import { uploadImage, getImageById } from "../controllers/imageController.js";
import multer from "multer";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";


// const upload = multer({ dest: "./uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }, { limits: { fileSize: 5 * 1024 * 1024 } });

const imageRouter = Router();

imageRouter.route("/").post(verifyTokenMiddleware, upload.single('image'), uploadImage);
imageRouter.route("/:imageId").get(verifyTokenMiddleware, getImageById);

export default imageRouter;
