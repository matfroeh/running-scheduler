import { Router } from "express";
import { uploadImage, getImageById } from "../controllers/imageController.js";
import multer from "multer";

// const upload = multer({ dest: "./uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageRouter = Router();

imageRouter.route("/").post(upload.single('image'), uploadImage);
imageRouter.route("/:imageId").get(getImageById);

export default imageRouter;
