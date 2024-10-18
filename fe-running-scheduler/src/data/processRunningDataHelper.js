export const getTempoAsMinutesSecondsString = (tempo) => {
  const minutes = Math.floor(tempo);
  const seconds = (tempo - minutes) * 60;
  return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};

export const getSecondsAsHoursMinutesSecondsString = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};
