import "./CoursePage.scss";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import {
  addTaskToCourse,
  completeCourse,
  deleteCourse,
} from "../../redux/slices/userSlice";
import {
  onClickOverlay,
  onToggleTaskForm,
  setModalStatus,
} from "../../redux/slices/toggleSlice";
import FatalError from "../../ui/FatalError/FatalError";
import NotFound from "../../../public/NotFound.svg";
import FormInput from "../../ui/FormInput/FormInput";
import Overlay from "../../ui/Overlay/Overlay";
import FormDateInput from "../../ui/FormDateInput/FormDateInput";
import DropDown from "../../ui/DropDown/DropDown";
import Reading from "../../../public/Reading.svg";
import Listening from "../../../public/Listening.svg";
import Speaking from "../../../public/Speaking.svg";
import Grammar from "../../../public/Grammar.svg";
import useValidateInput from "../../hooks/useValidateInput";
import useValidateDropDown from "../../hooks/useValidateDropDown";
import useValidateDayPicker from "../../hooks/useValidateDayPicker";
import { sortTasksByStartTime } from "../../utils/sortTasksByDate";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import { renderAllSortedTasks } from "../../utils/renderAllSortedTasks";

export enum TaskType {
  READING = "READING",
  LISTENING = "LISTENING",
  GRAMMAR = "GRAMMAR",
  SPEAKING = "SPEAKING",
}

const tasksData = [
  { name: TaskType.LISTENING, img: Listening },
  { name: TaskType.READING, img: Reading },
  { name: TaskType.SPEAKING, img: Speaking },
  { name: TaskType.GRAMMAR, img: Grammar },
];

type TInputs = {
  goal: string;
};
type TValidateInputs = {
  goal: boolean | null;
};

const CoursePage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { modalCourse } = useAppSelector((state: RootState) => state.toggle);
  const { taskForm } = useAppSelector((state: RootState) => state.toggle);
  const { courses } = useAppSelector((state: RootState) => state.user);
  const courseData = courses.filter((course) => course.id === params.course)[0];
  const check = courseData.tasksByDate
    .map((tasks) => ({
      ...tasks,
      tasks: tasks.tasks.filter((task) => task.isCompleted !== "expired"),
    }))
    .filter((tasks) => tasks.tasks.length > 0);

  const isCourseCompleted =
    check.length &&
    check.every((tasks) =>
      tasks.tasks.every((task) => task.isCompleted === true)
    );

  const sortedTasks = sortTasksByStartTime(courseData);

  const formInputs = useValidateInput<TInputs, TValidateInputs>(
    { goal: "" },
    { goal: null }
  );
  const dropDownInfo = useValidateDropDown(
    { name: "", img: "" },
    { name: null, img: null }
  );
  const dayPickerInfo = useValidateDayPicker({
    date: null,
    startTime: null,
    endTime: null,
  });

  const [dayPicker, setDayPicker] = React.useState(false);
  const [dropDown, setDropDown] = React.useState(false);

  const onToggleDayPicker = (): void => {
    setDayPicker((prev) => !prev);
  };

  const onToggleDropDown = (): void => {
    setDropDown((prev) => !prev);
  };

  const onDeleteCourse = (str: string): void => {
    dispatch(deleteCourse(str));
    dispatch(setModalStatus(null));
    navigate("/");
  };

  const onSubmitTaskForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedDay = String(dayPickerInfo.selectedDay);
    const startTime =
      dayPickerInfo.start &&
      dayPickerInfo.start.set("date", new Date(selectedDay).getDate()).format();
    const endTime =
      dayPickerInfo.end &&
      dayPickerInfo.end.set("date", new Date(selectedDay).getDate()).format();
    const taskData = {
      ...formInputs.value,
      start: startTime,
      end: endTime,
      selectedDay,
      ...dropDownInfo.value,
    };

    const validateTask = {
      ...formInputs.validate,
      ...dayPickerInfo.validate,
      ...dropDownInfo.validate,
    };

    if (
      !JSON.stringify(validateTask).includes("false") &&
      !JSON.stringify(validateTask).includes("null")
    ) {
      dispatch(
        addTaskToCourse({ task: taskData, target: String(params.course) })
      );

      dropDownInfo.resetToDefault();
      formInputs.resetToDefault();
      dayPickerInfo.resetToDefault();

      setDropDown(false);
      setDayPicker(false);

      dispatch(onToggleTaskForm());
    } else {
      formInputs.onError();
      dayPickerInfo.onError();
      dropDownInfo.onError();
    }
  };

  const onFinishCourse = () => {
    dispatch(setModalStatus({ status: "info" }));
  };
  const onConfirm = (str: string) => {
    dispatch(completeCourse(str));
    dispatch(setModalStatus(null));
  };

  return (
    <>
      <div className="course-page">
        <div className="course-page__header">
          <h2 className="course-page__header-language">
            {courseData.language}
          </h2>
          <div className="course-page__header-buttons">
            {courseData.isFinished && (
              <p className="course-page__header-completed">Completed 💚</p>
            )}
            {courseData.tasksByDate.length &&
            isCourseCompleted &&
            !courseData.isFinished ? (
              <button
                className="course-page__header-complete"
                onClick={onFinishCourse}
              >
                Complete course
              </button>
            ) : null}
            {courseData.tasksByDate.length && !courseData.isFinished ? (
              <button
                onClick={() => dispatch(onToggleTaskForm())}
                className="course-page__header-add"
              >
                +
              </button>
            ) : null}
            <button
              className="course-page__header-delete"
              onClick={() => dispatch(setModalStatus({ status: "delete" }))}
            >
              Delete course
            </button>
          </div>
        </div>
        <div className="course-page__tasks">
          <div className="course-page__tasks-header">
            {sortedTasks.length ? (
              renderAllSortedTasks(sortedTasks)
            ) : (
              <FatalError
                image={NotFound}
                text="Oops!"
                warn="There is no task found. Please click below to add task"
              >
                {!courseData.isFinished && (
                  <button
                    className="add-new-task__button"
                    onClick={() => dispatch(onToggleTaskForm())}
                  >
                    Add task
                  </button>
                )}
              </FatalError>
            )}
          </div>
        </div>
        {modalCourse?.status === "delete" ? (
          <ModalWindow
            status={modalCourse.status}
            onConfirm={() => onDeleteCourse(String(params.course))}
          />
        ) : null}
        {modalCourse?.status === "info" ? (
          <ModalWindow
            status={modalCourse.status}
            onConfirm={() => onConfirm(String(params.course))}
          />
        ) : null}
        {modalCourse ? <Overlay /> : null}
      </div>

      {taskForm && !courseData.isFinished ? (
        <>
          <Overlay />
          <form className="add-task__form">
            <h1 className="add-task__form-title">Add a new task</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="times-form"
              onClick={() => dispatch(onClickOverlay())}
            >
              <path
                d="M9.04958 7.98895L9.03853 8L9.04958 8.01105L12.9155 11.877C13.0069 11.9684 13.0069 12.1169 12.9155 12.2083L12.2083 12.9155C12.1169 13.0069 11.9684 13.0069 11.877 12.9155L11.216 12.2546L8.01105 9.04958L8 9.03853L7.98895 9.04958L4.1227 12.9155C4.0313 13.0069 3.88276 13.0069 3.79136 12.9155L3.08417 12.2083C2.99278 12.1169 2.99278 11.9684 3.08417 11.877L6.95042 8.01105L6.96147 8L6.95042 7.98895L3.08417 4.1227C2.99278 4.0313 2.99278 3.88276 3.08417 3.79136L3.79167 3.08418L3.79167 3.08417C3.88307 2.99278 4.03162 2.99278 4.12301 3.08417L7.98895 6.95042L8 6.96147L8.01105 6.95042L11.877 3.08449C11.9684 2.99309 12.1169 2.99309 12.2083 3.08449L12.9155 3.79167C13.0069 3.88307 13.0069 4.03162 12.9155 4.12301L12.2546 4.78395L9.04958 7.98895Z"
                fill="#9D9D99"
                stroke="#9D9D99"
                strokeWidth="0.03125"
              />
            </svg>
            <FormInput
              title="Task"
              name="goal"
              placeholder="Write a task here"
              minLength={6}
              maxLength={64}
              value={formInputs.value.goal}
              status={formInputs.validate.goal}
              handleChangeInput={formInputs.handleChangeInput}
            />
            <FormDateInput
              isActive={dayPicker}
              onToggle={onToggleDayPicker}
              date={dayPickerInfo.selectedDay}
              setDate={dayPickerInfo.onSelectDate}
              start={dayPickerInfo.start}
              end={dayPickerInfo.end}
              setStart={dayPickerInfo.onChangeStartTime}
              setEnd={dayPickerInfo.onChangeEndTime}
              isValideDate={dayPickerInfo.validate.date}
              isValideStart={dayPickerInfo.validate.startTime}
              isValideEnd={dayPickerInfo.validate.endTime}
            />
            <DropDown
              isActive={dropDown}
              title="Choose a type of activity"
              placeholder={
                dropDownInfo.value.name
                  ? dropDownInfo.value.name
                  : "Click to choose a type"
              }
              items={tasksData}
              onChooseMenuImage={dropDownInfo.onChooseMenuImage}
              onToggleMenu={onToggleDropDown}
              selectedOption={{
                name: dropDownInfo.value.name,
                img: dropDownInfo.value.img,
              }}
              isValidate={{
                name: dropDownInfo.validate.name,
                img: dropDownInfo.validate.img,
              }}
            />
            <button
              className="add-task__form-submit"
              onClick={onSubmitTaskForm}
              type="submit"
            >
              Add task
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default CoursePage;
