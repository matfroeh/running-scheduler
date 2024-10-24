import { useEffect, useState } from "react";
import axios from "axios";

// WORKS NOW ...
const ImageGallery = () => {
  const [images, setImages] = useState(null);

  const _id = "671a09c905bcb280313afcf0";

  //   const contentType = images.img.contentType;

  useEffect(() => {
    // Fetch images from the server when the component mounts
    const fetchImages = async (_id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/uploads/${_id}`
        );
        setImages(response.data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages(_id);
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images && (
          <img
            src={`data:${images.img.contentType};base64,${arrayBufferToBase64(images.img.data.data)}`}
            alt={images.name}
            style={{ width: "200px", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
