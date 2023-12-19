import React from "react";
import "./Notifications.scss";
import Message from "../../components/Message/Message";
import Task from "../../components/Task/Task";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getHoursAndMinutes } from "../../utils/getHoursAndMinutes";
import { onReadAllMessages } from "../../redux/slices/userSlice";
import FatalError from "../../ui/FatalError/FatalError";
import Router from "../../../public/router.svg";

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const { children } = useAppSelector(
    (state: RootState) => state.user.notifications
  );
  const filteredNotifications = children.length
    ? children.filter((not) => not.isDeleted === false)
    : null;

  const renderNotifications = filteredNotifications?.length ? (
    filteredNotifications.map((notification, index) => {
      return (
        <Message
          key={index}
          type={notification.type}
          text={
            notification.type === "fail" ?
            "Oh no,it looks like you didn't have time to complete the task 😒" : null
          }
          isRead={notification.isRead}
          date={notification.expiredDate}
          id={notification.id}
          course={notification.course}
        >
          {notification.type === "fail" &&
            notification.expiredTasks?.map((tasks, i) => {
              return (
                <Task
                  key={i}
                  size="lg"
                  activityType={tasks.img}
                  name={tasks.name}
                  startTime={tasks.start ? getHoursAndMinutes(tasks.start) : ""}
                  endTime={tasks.end ? getHoursAndMinutes(tasks.end) : ""}
                  id={tasks.id}
                  isCompleted={tasks.isCompleted}
                  date={tasks.selectedDay}
                />
              );
            })}
        </Message>
      );
    })
  ) : (
    <FatalError
      image={Router}
      text="Oops"
      warn="There are no notifications yet 😑"
    />
  );

  return (
    <div className="info-notifications">
      <div className="info-notifications__head">
        <h2 className="info-notifications__title">Notifications</h2>
        {filteredNotifications?.length ? (
          <button
            className="info-notifications__read"
            onClick={() => dispatch(onReadAllMessages())}
          >
            Read all
          </button>
        ) : null}
      </div>
      <section className="info-notifications__list">
        {renderNotifications}
      </section>
    </div>
  );
};

export default Notifications;
