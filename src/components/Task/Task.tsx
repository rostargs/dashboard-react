import React from "react";
import "./Task.scss";
import Book from "../../../public/book.svg";
import Complete from "../../../public/successIcon.svg";
import Delete from "../../../public/deleteIcon.svg";
import {
  completeTask,
  deleteTaskFromCourse,
} from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/store";
import Cancel from "../../../public/cancelIcon.svg";
import HoverMenu from "../../ui/HoverMenu/HoverMenu";

type TTask = {
  size: "sm" | "lg";
  activityType: string;
  name: string;
  startTime: string;
  endTime: string;
  id: string;
  date: string;
  isCompleted: boolean | "expired";
  language?: string;
};

const Task: React.FC<TTask> = ({
  size,
  activityType,
  name,
  startTime,
  endTime,
  id,
  date,
  isCompleted,
  language,
}) => {
  const refTask = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const onDeleteTask = () => {
    const taskDate = refTask.current?.getAttribute("datatype-date");
    const taskId = refTask.current?.getAttribute("datatype-id");
    if (!taskId || !taskDate) return;

    dispatch(deleteTaskFromCourse({ date: taskDate, task: taskId }));
  };

  const onCompleteTask = () => {
    const taskDate = refTask.current?.getAttribute("datatype-date");
    const taskId = refTask.current?.getAttribute("datatype-id");
    if (!taskId || !taskDate) return;

    dispatch(completeTask({ date: taskDate, task: taskId }));
  };

  return (
    <div
      className={`task ${isCompleted ? "task--completed" : ""}`}
      style={
        size === "lg"
          ? { padding: "1rem", background: "#faf9f8" }
          : { padding: "1.5rem" }
      }
      datatype-id={id}
      datatype-date={date}
      datatype-completed={String(isCompleted)}
      ref={refTask}
    >
      <img
        className={`task__img ${isCompleted ? "task__img--completed" : ""}`}
        src={activityType}
        alt="Book"
      />
      <div className="task__wrapper">
        <h5 className="task__name" style={isCompleted ? { color: "#FFF" } : {}}>
          {name} {language ? ` - (${language})` : null}
        </h5>
        <p
          className={`task__deadline ${
            isCompleted ? "task__deadline--completed" : ""
          }`}
        >
          {startTime} - {endTime}
        </p>
      </div>
      {isCompleted !== "expired" && size === "sm" ? (
        <div className="task__module">
          <HoverMenu isCompleted={isCompleted} withTile direction="up">
            {!isCompleted && (
              <li onClick={onCompleteTask} className="menu-option">
                {isCompleted ? "Cancel" : "Complete"}
              </li>
            )}
            <li onClick={onDeleteTask} className="menu-option">
              Delete
            </li>
          </HoverMenu>
        </div>
      ) : (
        isCompleted !== "expired" &&
        size === "lg" && (
          <div className="task__options">
            {!isCompleted && 
              <img
                src={Complete}
                onClick={onCompleteTask}
                alt="Complete"
              />
            }
            <img src={Delete} onClick={onDeleteTask} alt="Delete" />
          </div>
        )
      )}
    </div>
  );
};

export default Task;
