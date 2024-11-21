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
