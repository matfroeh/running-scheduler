import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";

const ImageContainer = ({ imageUrl, image }) => {
  return (
    <>
      {!imageUrl && image && (
        <img
          src={`data:${image.img.contentType};base64,${arrayBufferToBase64(
            image.img.data.data
          )}`}
          alt={image.name}
          className="rounded-lg w-32 h-32 object-scale-down"
        />
      )}
    </>
  );
};

export default ImageContainer;
