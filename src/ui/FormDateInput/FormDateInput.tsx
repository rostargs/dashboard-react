import React from "react";
import "./FormDateInput.scss";
import { DayPicker } from "react-day-picker";
import format from "date-fns/format";
import "react-day-picker/dist/style.css";
import { TimeField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type TDateInput = {
  isActive: boolean;
  onToggle: () => void;
  date: Date | null;
  start: Dayjs | null;
  end: Dayjs | null;
  setDate: (date: Date) => void;
  setStart: (start: dayjs.Dayjs) => void;
  setEnd: (end: dayjs.Dayjs) => void;
  isValideDate: boolean | null;
  isValideStart: boolean | null;
  isValideEnd: boolean | null;
};

const FormDateInput: React.FC<TDateInput> = ({
  isActive,
  onToggle,
  date,
  start,
  end,
  setDate,
  setStart,
  setEnd,
  isValideDate,
  isValideEnd,
  isValideStart,
}) => {
  const convertTime = (time: Dayjs, type: "inc" | "dec") => {
    if (!time.isValid()) return;

    const date = new Date(time.format());

    type === "inc"
      ? date.setMinutes(date.getMinutes() + 1)
      : date.setMinutes(date.getMinutes() - 1);

    return dayjs(date.toISOString());
  };

  const todayDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate() - 1,
  };

  const isValidInputs =
    isValideDate === true && isValideStart === true && isValideEnd === true;
  const isEmpty =
    isValideDate === null && isValideStart === null && isValideEnd === null;
  const validateColor =
    !isEmpty && !isValidInputs
      ? "#EB5757"
      : isValidInputs
      ? "#75CC6D"
      : "#7A5CFA";

  const fill =
    isActive && isEmpty
      ? validateColor
      : isEmpty === false
      ? validateColor
      : "#666";
  const today =
    date && String(date) === String(new Date(new Date().setHours(0, 0, 0)));

  return (
    <div className="form-date-input">
      <label className="form-date-input__label" onClick={onToggle}>
        Choose the date
      </label>
      <div
        className={`form-date-input__date-picker ${
          isActive ? "form-date-input__date-picker--active" : ""
        } ${
          !isEmpty
            ? isValidInputs
              ? "form-date-input__date-picker--success"
              : "form-date-input__date-picker--error"
            : ""
        }`}
        onClick={onToggle}
      >
        {date ? format(date, "PP") : "Choose the date"}
        <svg
          className={isActive ? "active-arrow" : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_1_105)">
            <path
              d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0_1_105">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {isActive ? (
        <div className="form-date-input__blank">
          <DayPicker
            mode="single"
            selected={date ? date : undefined}
            onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
            ISOWeek
            showOutsideDays
            disabled={{
              from: new Date(0),
              to: new Date(
                `${todayDate.year}-${todayDate.month}-${todayDate.day}`
              ),
            }}
          />
          <div className="form-date-input__wrapper">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                disabled={!date}
                className="time-field"
                label="From"
                format="HH:mm"
                value={start}
                minTime={
                  today ? dayjs().set("hour", new Date().getHours()) : null
                }
                onChange={(newValue) => newValue && setStart(newValue)}
                maxTime={end && convertTime(end, "dec")}
              />
              <TimeField
                required
                disabled={!date}
                className="time-field"
                label="To"
                format="HH:mm"
                value={end}
                onChange={(newValue) => newValue && setEnd(newValue)}
                minTime={start && convertTime(start, "inc")}
              />
            </LocalizationProvider>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FormDateInput;
