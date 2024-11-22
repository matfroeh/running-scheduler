const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export default formatDate;
