import { Router } from "express";
import {
  getEquipmentListFromUser,
  addEquipmentToUserList,
  createEquipment,
  updateEquipment,
  deleteEquipmentFromUserList,
} from "../controllers/userController.js";

// separate router from authRouter for the user getting and posting equipment data
// ToDo: adding the verification  middleware after testing
const userRouter = Router();

userRouter
  .route("/:userId")
  .get(getEquipmentListFromUser)
  .post(createEquipment); // get user equipment list, create user equipment (not insert in list)
userRouter
  .route("/:userId/:equipmentId")
  .post(addEquipmentToUserList)
  .put(updateEquipment)
  .delete(deleteEquipmentFromUserList); // add to user equipment list, update or delete user equipment in list

export default userRouter;