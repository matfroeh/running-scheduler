import { postImageToApi } from "../data/image";

export const readMultipleFiles = (event) => {
  const files = event.target.files;
  const readers = [];

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    readers.push(
      new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsText(file);
      })
    );
  });

  return readers;
};

// ToDo: Not sure where to put this function optimally
export const uploadImage = async (selectedFile, user, imageName) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("userId", user.userId);
  formData.append("name", imageName);
  const imageId = await postImageToApi(formData, signal);
  controller.abort();
  return imageId;
};

export const imageChange = async (e, setImageUrl, setSelectedFile) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setImageUrl(reader.result);
  };
  reader.readAsDataURL(file);
  setSelectedFile(file);
};
