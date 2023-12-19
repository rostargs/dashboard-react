import React from "react";
import Success from "../../../public/check-message.svg";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import "./Message.scss";
import format from "date-fns/format";
import {
  TCourse,
  onDeleteExactMessage,
  onReadExactMessage,
} from "../../redux/slices/userSlice";
import Danger from "../../../public/Danger.svg";
import CourseCard from "../CourseCard/CourseCard";

type TMessage = {
  type?: "congratulations" | "fail";
  children?: React.ReactNode;
  text?: string | null;
  isRead?: boolean;
  date: string;
  id: string;
  course?: TCourse;
};

const Message: React.FC<TMessage> = ({
  type,
  children,
  text,
  isRead,
  date,
  id,
  course,
}) => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state: RootState) => state.user.userData);
  const refMessage = React.useRef<SVGSVGElement | null>(null);

  const onDeleteMessage = () => {
    const messageID = refMessage.current?.getAttribute("datatype-id");
    if (messageID) dispatch(onDeleteExactMessage(messageID));
  };

  const onReadMessage = () => {
    const id = refMessage.current?.getAttribute("datatype-id");
    if (id) dispatch(onReadExactMessage(id));
  };

  return (
    <div className="notification-message" datatype-isread={String(isRead)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        className="notification-message__delete"
        datatype-id={id}
        ref={refMessage}
        onClick={onDeleteMessage}
      >
        <path
          d="M11 0.726403L10.2735 0L5.5 4.77353L0.726467 0L0 0.726403L4.77357 5.49997L0 10.2735L0.726467 10.9999L5.5 6.2264L10.2735 10.9999L11 10.2735L6.22644 5.49997L11 0.726403Z"
          fill={isRead ? "#222" : "#CCCCCC"}
        />
      </svg>
      <div className="notification-message__head">
        <img
          src={type === "congratulations" ? Success : Danger}
          alt="Notification image"
        />
        <h4
          className={`notification-message__type notification-message__type--${type}`}
        >
          {type === "congratulations"
            ? `Well done, ${name}!`
            : "I think you forgot something..."}
        </h4>
        <span className="notification-message__date">
          {format(new Date(date), "PP")}
        </span>
      </div>
      {text && <p className="notification-message__salute">{text}</p>}
      {children && (
        <main className="notification-message__children">{children}</main>
      )}
      {course ? (
        <div className="notification-message__course">
          <CourseCard
            title={course.language}
            tasks={course.tasksByDate.reduce(
              (acc, curr) => (acc += curr.tasks.length),
              0
            )}
            progress={100}
            image={course.imageStyle.img}
            color={course.backgroundColor}
          />

          <p>The goal "{course.goal}" was achived!</p>
        </div>
      ) : null}
      {!isRead && (
        <button className="notification-message__read" onClick={onReadMessage}>
          Read message
        </button>
      )}
    </div>
  );
};

export default Message;
