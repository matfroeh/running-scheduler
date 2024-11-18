export const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

// export const imageUrl = (image) => {
//   `data:${image.img.contentType};base64,${arrayBufferToBase64(
//     image.img.data.data
//   )}`;
// };
