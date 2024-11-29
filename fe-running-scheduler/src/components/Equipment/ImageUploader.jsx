import { ButtonHiddenInput, ImagePreviewGroup } from "@/components/Equipment";

const ImageUploader = ({
  imageUrl,
  imgInputRef,
  handleImageChange,
}) => {
  const imageChange = async (e) => {
    await handleImageChange(e);
  };

  return (
    <div className="flex flex-col">
      {/* {!imageId && (
        <ButtonHiddenInput
          imageUrl={imageUrl}
          onClick={() => imgInputRef.current.click()}
          onChange={imageChange}
          refForward={imgInputRef}
        />
      )} */}
      <ButtonHiddenInput
        imageUrl={imageUrl}
        onClick={() => imgInputRef.current.click()}
        onChange={imageChange}
        refForward={imgInputRef}
      />
      {/* {imageUrl && (
        <ImagePreviewGroup
          imageUrl={imageUrl}
        />
      )} */}
    </div>
  );
};

export default ImageUploader;
