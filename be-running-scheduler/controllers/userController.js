import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";
import Equipment from "../models/Equipment.js";

export const getEquipmentListFromUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  const equipmentList = await Equipment.find({ equipmentOwner: userId });
  res.status(200).json(equipmentList);
});

export const createEquipment = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  const equipment = await Equipment.create(req.body);

  res.status(201).json(equipment);
});

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
      _id: equipmentId,
      equipmentOwner: userId, // not really necessary but maybe we want the equipment to be independent form the user later
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

// ToDo: there is something off in my logic of the Model here, because the Equipment will be still in the collection
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
    user.equipmentList = user.equipmentList.filter(
      (equipment) => equipment !== equipmentId
    );
    await user.save();
    res.status(200).json(user);
  }
);
