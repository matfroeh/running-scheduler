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
  .post(createEquipment) // get user equipment list, create user equipment (not insert in list)
  .delete(deleteUser); // delete user
userRouter
  .route("/:userId/:equipmentId")
  .get(getEquipmentById)
  .post(addEquipmentToUserList)
  .put(updateEquipment)
  .delete(deleteEquipmentFromUserList); // add to user equipment list, update or delete user equipment in list

export default userRouter;
