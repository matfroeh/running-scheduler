import { ButtonUpload } from './ButtonUpload'

const ImagePreviewGroup = ({imageId, setImage, imageUrl}) => {
  return (
    <div className="flex flex-col justify-start mt-4">
    <div>
      <ButtonUpload imageId={imageId} onClick={setImage} />
    </div>
    <img
      src={imageUrl}
      alt="Equipment picture"
      className="w-1/3 mt-4"
    />
  </div>
  )
}

export default ImagePreviewGroup