import Image from "../models/Image.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { resizeImage } from "../utils/resizeImage.js";

export const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new ErrorResponse("Please upload a file", 400));

  const resizedBuffer = await resizeImage(req.file.buffer, 640, null);
  const name = Date.now().toString(36).substring(2, 15);

  const newImage = new Image({
    name: name,
    img: {
      data: resizedBuffer,
      contentType: req.file.mimetype,
    },
  });
  if (!newImage)
    return next(new ErrorResponse("Image could not be uploaded", 500));

  await newImage.save();
  res.status(201).json(newImage._id);
});

export const getImageById = asyncHandler(async (req, res, next) => {
  const { imageId } = req.params;

  const image = await Image.findById({ _id: imageId });

  if (!image) return next(new ErrorResponse("Image not found", 404));
  res.status(200).json(image);
});
