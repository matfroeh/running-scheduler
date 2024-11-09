import { Router } from "express";
import {
  getEquipmentListFromUser,
  addEquipmentToUserList,
  createEquipment,
  updateEquipment,
  deleteEquipmentFromUserList,
  updateUser,
  getEquipmentById,
} from "../controllers/userController.js";
import verifyTokenMiddleware from "../middleware/verifyTokenMiddleware.js";

// separate router from authRouter for the user getting and posting equipment data
const userRouter = Router();

userRouter
  .route("/:userId")
  .get(verifyTokenMiddleware, getEquipmentListFromUser)
  .put(verifyTokenMiddleware, updateUser) // we will use put to set the image_id
  .post(verifyTokenMiddleware, createEquipment); // get user equipment list, create user equipment (not insert in list)
userRouter
  .route("/:userId/:equipmentId")
  .get(verifyTokenMiddleware, getEquipmentById)
  .post(verifyTokenMiddleware, addEquipmentToUserList)
  .put(verifyTokenMiddleware, updateEquipment)
  .delete(verifyTokenMiddleware, deleteEquipmentFromUserList); // add to user equipment list, update or delete user equipment in list

export default userRouter;
