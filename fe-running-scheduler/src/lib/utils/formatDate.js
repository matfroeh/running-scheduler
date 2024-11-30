export const formatDateYYMMDD = (date) => {
  return new Date(date).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const formatDate = (dateString, options) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-UK", options).format(new Date(dateString));
}
