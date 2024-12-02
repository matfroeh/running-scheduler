import { Router } from "express";
import {
  getEquipmentListFromUser,
  addEquipmentToUserList,
  createEquipment,
  updateEquipment,
  deleteEquipmentFromUserList,
  updateUser,
  getEquipmentById,
  deleteUser,
} from "../controllers/userController.js";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";
import demoProtectionMiddleware from "../middleware/demoProtectionMiddleware.js";
import validateJOI from "../middleware/validateJOI.js";
import equipmentSchema from "../joi/equipmentSchema.js";

// separate router from authRouter for the user getting and posting equipment data

// ToDo: make it a own route with a own controller
const userRouter = Router();

// Apply verifyToken and demoProtection middlewares to all routes.
// Only GET requests are allowed for demo users.
userRouter.use([verifyTokenMiddleware, demoProtectionMiddleware]);

userRouter
  .route("/:userId")
  .get(getEquipmentListFromUser)
  .put(updateUser) // we will use put to set the image_id in the user table
  .post(validateJOI(equipmentSchema), createEquipment) // create user equipment and add to user equipment list
  .delete(deleteUser); // delete user
userRouter
  .route("/:userId/:equipmentId")
  .get(getEquipmentById)
  .post(addEquipmentToUserList) // not used in the frontend right now
  .put(validateJOI(equipmentSchema), updateEquipment)
  .delete(deleteEquipmentFromUserList); // delete equipment from user and equipment document

export default userRouter;
