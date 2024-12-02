import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";
import Equipment from "../models/Equipment.js";

export const getEquipmentListFromUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId }).populate("equipmentList");
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  // const equipmentList = await Equipment.find({ owner: userId });

  res.status(200).json(user.equipmentList);
});

export const getEquipmentById = asyncHandler(async (req, res, next) => {
  const { equipmentId, userId } = req.params;
  const equipment = await Equipment.findOne({
    $and: [{ _id: equipmentId }, { owner: userId }],
  });
  if (!equipment)
    return next(
      new ErrorResponse(`Equipment not found with id of ${equipmentId}`, 404)
    );
  res.status(200).json(equipment);
});

// The return values are a bit inconsistent w.r. to the other request handlings but by this way these are the same as the ones in the authController.me function and this will avoid confusion in the frontend
export const updateUser = asyncHandler(async (req, res, next) => {
  const { userId, userRole } = req.params;

  const user = await User.findOne({
    _id: userId,
  });

  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));

  const updated = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .populate("equipmentList");
  const { userName, email, equipmentList, profilePicture } = updated;

  res
    .status(200)
    .json({userId, userName, email, userRole, equipmentList, profilePicture});
});

// modified it, so it will not only create the equipment, but also add the equipment to the user list
export const createEquipment = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  const equipment = await Equipment.create({ ...req.body, owner: userId });
  if (!equipment)
    return next(new ErrorResponse(`Error creating equipment`, 404));
  user.equipmentList.push(equipment._id);
  await user.save();

  res.status(201).json(equipment);
});

// not needed right now
export const addEquipmentToUserList = asyncHandler(async (req, res, next) => {
  const { userId, equipmentId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  const equipment = await Equipment.findOne({ _id: equipmentId });
  if (!equipment)
    return next(
      new ErrorResponse(`Equipment not found with id of ${equipmentId}`, 404)
    );
  user.equipmentList.push(equipmentId);
  await user.save();
  res.status(200).json(user);
});

export const updateEquipment = asyncHandler(async (req, res, next) => {
  const { userId, equipmentId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  const equipment = await Equipment.findOne({ _id: equipmentId });
  if (!equipment)
    return next(
      new ErrorResponse(`Equipment not found with id of ${equipmentId}`, 404)
    );
  const updatedEquipment = await Equipment.findOneAndUpdate(
    {
      _id: equipmentId, // Is this really AND
      owner: userId, // not really necessary but maybe we want the equipment to be independent form the user later
    },
    req.body,
    {
      new: true, // ToDo: I still do not understand this quite well
      runValidators: true, // ToDo: let's see if we need this and add later to run/schedule controllers
    }
  );
  if (!updatedEquipment)
    return next(
      new ErrorResponse(`Equipment not found with id of ${equipmentId}`, 404)
    );
  res.status(200).json(updatedEquipment);
});

export const deleteEquipmentFromUserList = asyncHandler(
  async (req, res, next) => {
    const { userId, equipmentId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user)
      return next(
        new ErrorResponse(`User not found with id of ${userId}`, 404)
      );
    const equipment = await Equipment.findOne({ _id: equipmentId });
    if (!equipment)
      return next(
        new ErrorResponse(`Equipment not found with id of ${equipmentId}`, 404)
      );

    // console.log("backend: equipment found", equipment);
    // console.log(equipmentId);

    // remove from user's equipmentList
    user.equipmentList.pull({ _id: equipmentId });
    // remove from equipment collection
    await Equipment.deleteOne({ _id: equipmentId });

    // console.log("backend: userEquipList, ", user.equipmentList);

    await user.save();
    res.status(200).json(user);
  }
);

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  console.log("request received to delete user with id: ", userId);

  const user = await User.findOne({ _id: userId });
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  await User.deleteOne({ _id: userId });
  res.status(200).json({ success: "User deleted successfully", status: 200 });
});
