import dayjs from "dayjs";

export const getHoursAndMinutes = (time: string): string => {
  const date = new Date(dayjs(time)?.format());
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
};
