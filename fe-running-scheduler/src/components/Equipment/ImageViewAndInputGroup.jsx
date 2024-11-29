import { useRef } from "react";
import Icons from "@/components/Icons";
import { ImageContainer } from "@/components/Equipment/";

const ImageViewAndInputGroup = ({ image, imageUrl, handleImageChange }) => {
  const imgInputRef = useRef(null);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex justify-center mask mask-circle w-1/4 max-w-52 cursor-pointer">
        <ImageContainer image={image} imageUrl={imageUrl} />
        <div
          className="flex hover-overlay justify-center items-center"
          onClick={() => imgInputRef.current.click()}
        >
          <Icons type="image" />
        </div>
      </div>
      <input
        ref={imgInputRef}
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
        accept={"image/*"}
      />
    </div>
  );
};

export default ImageViewAndInputGroup;
