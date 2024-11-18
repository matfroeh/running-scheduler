import sharp from "sharp";

export const resizeImage = async (buffer, width, height) => {
  const image = await sharp(buffer);
  const resizedImage = await image.resize(width, height).jpeg({ quality: 80 });
  return resizedImage.toBuffer();
};
