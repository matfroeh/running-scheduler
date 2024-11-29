import { Router } from "express";
import {
  uploadImage,
  getImageById,
  deleteImage,
} from "../controllers/imageController.js";
import multer from "multer";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";
import demoProtectionMiddleware from "../middleware/demoProtectionMiddleware.js";

// ToDo: need to find a separate validation middleware for image upload
// import validateJOI from "../middleware/validateJOI.js";
// import imageSchema from "../joi/imageSchema.js";

// const upload = multer({ dest: "./uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
const storage = multer.memoryStorage();
const upload = multer(
  { storage: storage },
  { limits: { fileSize: 5 * 1024 * 1024 } }
);

const imageRouter = Router();

imageRouter.use([verifyTokenMiddleware, demoProtectionMiddleware]);

imageRouter.route("/").post(upload.single("image"), uploadImage);
imageRouter.route("/:imageId").get(getImageById).delete(deleteImage);

export default imageRouter;
