import { ButtonHiddenInput, ImagePreviewGroup } from "@/components/Equipment";

const ImageUploader = ({
  imageUrl,
  imgInputRef,
  imageId,
  handleImageUpload,
  handleImageChange,
  // setImageUrl,
  // setSelectedFile,
}) => {
  const imageChange = async (e) => {
    await handleImageChange(e);
  };

  return (
    <div className="flex flex-col">
      {!imageId && (
        <ButtonHiddenInput
          imageUrl={imageUrl}
          onClick={() => imgInputRef.current.click()}
          onChange={imageChange}
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
