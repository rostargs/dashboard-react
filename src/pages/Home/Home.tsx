import React from "react";
import "./Home.scss";
import { Link, useSearchParams } from "react-router-dom";
import Calendar from "../../../public/calendar.svg";
import Task from "../../components/Task/Task";
import { RootState, useAppSelector } from "../../redux/store";
import FatalError from "../../ui/FatalError/FatalError";
import SadCamera from "../../../public/SadCamera.svg";
import { getHoursAndMinutes } from "../../utils/getHoursAndMinutes";
import { taskSelect } from "../../redux/slices/userSlice";
import SearchInput from "../../ui/SearchInput/SearchInput";
import HoverMenu from "../../ui/HoverMenu/HoverMenu";
import { DayPicker } from "react-day-picker";
import format from "date-fns/format";
import { renderAllCourseCards } from "../../utils/renderAllCourseCard";
import Question from "../../../public/Question.svg";

const Home: React.FC = () => {
  const [searchCourseParams] = useSearchParams();
  const { userData } = useAppSelector((state: RootState) => state.user);
  const { courses } = useAppSelector((state: RootState) => state.user);
  const [selectedDay, setSelectedDay] = React.useState<Date>(new Date());
  const allTasks = useAppSelector(taskSelect);
  const tasks = allTasks
    .filter(
      (tasks) =>
        tasks.selectedDay === String(new Date(format(selectedDay, "PP")))
    )
    .filter((task) => task.isCompleted !== "expired").length;

  const renderAllTasks = () => {
    const taskToRender = allTasks
      .filter(
        (tasks) =>
          tasks.selectedDay === String(new Date(format(selectedDay, "PP")))
      )
      .filter((task) => task.isCompleted !== "expired");

    return taskToRender.length
      ? taskToRender.map((task, i) => {
          return (
            <Task
              key={i}
              size="sm"
              activityType={task.img}
              name={task.goal}
              startTime={task.start ? getHoursAndMinutes(task.start) : ""}
              endTime={task.end ? getHoursAndMinutes(task.end) : ""}
              id={task.id}
              date={task.selectedDay}
              isCompleted={task.isCompleted}
            />
          );
        })
      : false;
  };

  return (
    <div className="home">
      {userData.isLogged ? (
        <h3 className="home__greeting">
          Hello <b>{userData.name}</b>, welcome back!
        </h3>
      ) : (
        <h3 className="home__greeting">
          Welcome to <b>SET</b>!
        </h3>
      )}

      <div className="home__courses">
        <div className="home__courses-header">
          <div className="home__courses-wrapper">
            <h2 className="home__courses-name">My Courses</h2>
            <Link to="course">View All</Link>
          </div>
          <SearchInput />
        </div>

        <div
          className="home__cards"
          style={
            userData.isLogged &&
            courses.length &&
            courses.filter(
              (courses) =>
                !courses.language
                  .toLocaleLowerCase()
                  .includes(
                    searchCourseParams
                      .get("search-course")
                      ?.toLocaleLowerCase() || ""
                  )
            ).length === 0
              ? {}
              : { gridTemplateColumns: "1fr" }
          }
        >
          {userData.isLogged ? (
            renderAllCourseCards(courses, searchCourseParams)
          ) : (
            <FatalError
              image={Question}
              text="Oops!"
              warn="There is no course found. Please click below to add your course"
              button="Create course"
              path="create-course"
            />
          )}
        </div>

        <div className="home__plans">
          <div className="home__plans-header">
            <div className="home__plans-wrapper">
              <h2 className="home__plans-name">Planning</h2>
              <Link to="planning">View All</Link>
            </div>
            <div className="home__plans-calendar">
              <HoverMenu hoverImage={Calendar} direction="down">
                <DayPicker
                  mode="single"
                  selected={selectedDay ? selectedDay : undefined}
                  onSelect={(selectedDate) =>
                    selectedDate && setSelectedDay(selectedDate)
                  }
                  ISOWeek
                  showOutsideDays
                />
              </HoverMenu>
              <span className="home__plans-date">
                {format(selectedDay, "PP")}
              </span>
            </div>
          </div>

          <div
            className="home__tasks"
            style={
              userData.isLogged && tasks
                ? { gridTemplateColumns: "repeat(2,1fr)" }
                : { gridTemplateColumns: "1fr", paddingTop: "3rem" }
            }
          >
            {tasks && userData.isLogged ? (
              renderAllTasks()
            ) : (
              <FatalError
                image={SadCamera}
                text="Ooops!"
                warn="There is no tasks for today.."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
