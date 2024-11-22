import { ButtonHiddenInput, ImagePreviewGroup } from "@/components/Equipment";
import { imageChange } from "@/lib/fileHandling";

const ImageUploader = ({
  imageUrl,
  imgInputRef,
  imageId,
  handleImageUpload,
  setImageUrl,
  setSelectedFile,
}) => {
  const handleImageChange = async (e) => {
    await imageChange(e, setImageUrl, setSelectedFile);
  };

  return (
    <div className="flex flex-col">
      {!imageId && (
        <ButtonHiddenInput
          imageUrl={imageUrl}
          onClick={() => imgInputRef.current.click()}
          onChange={handleImageChange}
          refForward={imgInputRef}
        />
      )}
      {imageUrl && (
        <ImagePreviewGroup
          imageId={imageId}
          setImage={handleImageUpload}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default ImageUploader;
