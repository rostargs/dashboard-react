import React from "react";
import dayjs, { Dayjs } from "dayjs";
import format from "date-fns/format";
import { replaceNullWithFalse } from "../utils/replaceNullWithFalse";

type TValidateDayPicker = {
  date: boolean | null;
  startTime: boolean | null;
  endTime: boolean | null;
};

const useValidateDayPicker = <T extends TValidateDayPicker>(
  validateState: T
) => {
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const [start, setStart] = React.useState<Dayjs | null>(null);
  const [end, setEnd] = React.useState<Dayjs | null>(null);
  const [rerender, setRerender] = React.useState(false);
  const [validate, setValidate] = React.useState(validateState);

  const onSelectDate = (date: Date) => {
    setSelectedDay(date);
  };
  const onChangeStartTime = (start: dayjs.Dayjs): void => {
    setStart(start);
  };

  const onChangeEndTime = (end: dayjs.Dayjs): void => {
    setEnd(end);
  };
  const today =
    String(selectedDay) === String(new Date(new Date().setHours(0, 0, 0)));

  React.useEffect(() => {
    if (rerender) {
      selectedDay && format(selectedDay, "PP").length
        ? setValidate((prev) => {
            return { ...prev, date: true };
          })
        : setValidate((prev) => {
            return { ...prev, date: false };
          });
    } else {
      setRerender(true);
    }
  }, [selectedDay]);

  React.useEffect(() => {
    if (start && start.isValid() && end && end.isValid()) {
      if (
        new Date(start.format()) < new Date(end.format()) && today
          ? new Date(start.format()) > new Date()
          : true
      ) {
        setValidate((prev) => {
          return { ...prev, startTime: true, endTime: true };
        });
      } else {
        setValidate((prev) => {
          return { ...prev, startTime: false, endTime: false };
        });
      }
    } else {
      setValidate((prev) => {
        return { ...prev, startTime: null, endTime: null };
      });
    }
  }, [end, start, selectedDay]);

  const resetToDefault = (): void => {
    setSelectedDay(null);
    setEnd(null);
    setStart(null);
    setRerender(false);
    setValidate(validateState);
  };

  const onError = (): void => {
    const updatedValidation = replaceNullWithFalse(validate);
    setValidate(updatedValidation);
  };

  return {
    selectedDay,
    start,
    end,
    validate,
    onSelectDate,
    onChangeEndTime,
    onChangeStartTime,
    resetToDefault,
    onError,
  };
};

export default useValidateDayPicker;
