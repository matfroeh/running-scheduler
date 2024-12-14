import dayjs from "dayjs";

export const formatDateYYMMDD = (date) => {
    return new Date(date).toLocaleDateString("en-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
};

export const formatDate = (dateString, options) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-UK", options).format(
        new Date(dateString)
    );
};

export const dateToDatePickerFormat = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
};
