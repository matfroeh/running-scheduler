import { arrayBufferToBase64 } from "@/utils/arrayBufferToBase64";

const ImageContainer = ( {imageUrl, image, placeholder = "/shoe-colorful-placeholder.png"} ) => {  
  return (
    <>
      {!imageUrl && image && (
        <img
          src={`data:${image.img.contentType};base64,${arrayBufferToBase64(
            image.img.data.data
          )}`}
          alt={image.name}
          className="rounded-lg object-scale-down max-h-36"
        />
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={"New Equipment Image"}
          className="rounded-lg object-scale-down max-h-36"
        />
      )}
      {!image && !imageUrl && (
        <img
          src={placeholder}
          alt="Equipment placeholder picture"
          className="rounded-lg object-scale-down max-h-36"
        />
      )}
    </>
  );
};

export default ImageContainer;
