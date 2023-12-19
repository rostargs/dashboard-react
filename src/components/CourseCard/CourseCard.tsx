import React from "react";
import "./CourseCard.scss";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type TCard = {
  path?: string;
  title: string;
  tasks?: number;
  progress?: number;
  image: string;
  color: { r: number; g: number; b: number };
  isCompleted?: boolean;
};

const CourseCard: React.FC<TCard> = React.memo(
  ({ path, title, tasks, progress, image, color, isCompleted }) => {
    return (
      <Link
        to={`/${path ? "course/" + path : "#"}`}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
          !path && e.preventDefault()
        }
        replace={true}
      >
        <div
          className="course-card"
          style={{
            boxShadow: `0 1rem 3rem 0 rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`,
            cursor: `${path ? "pointer" : "default"}`,
          }}
        >
          <div
            className="bg-color"
            style={{
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="136"
            height="80"
            viewBox="0 0 136 80"
            fill="none"
            className="right-card"
          >
            <path
              opacity="0.5"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.308594 80H116.001C127.038 80 135.987 71.0592 136.001 60.025C136.001 60.0167 136.001 60.0083 136.001 60L136.001 0C135.232 11.6667 121.97 35 75.0778 35C28.1855 35 5.69321 65 0.308594 80Z"
              fill={`rgb(${color.r}, ${color.g}, ${color.b})`}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="81"
            height="41"
            viewBox="0 0 81 41"
            fill="none"
            className="left-card"
          >
            <path
              opacity="0.6"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M80.6191 0C79.5986 6.9096 73.3452 26.3399 47.5836 35.1535C22.5889 43.7047 6.12314 40.7638 0.000186172 38L0.000192349 20C0.000191457 8.95431 8.95451 6.78721e-06 20.0002 5.7411e-06L80.6191 0Z"
              fill={`rgb(${color.r}, ${color.g}, ${color.b})`}
            />
          </svg>

          <div className="course-card__left">
            <h2 className="course-card__title">{title}</h2>

            {isCompleted ? (
              <p className="course-card__completed">Completed!</p>
            ) : (
              <p className="course-card__tasks">{tasks} lessons</p>
            )}
            <div className="course-card__circular">
              <CircularProgressbar
                value={isCompleted ? 100 : progress ? progress : 0}
                maxValue={100}
                minValue={0}
                text={`${isCompleted ? 100 : progress ? progress : 0}%`}
                styles={buildStyles({
                  textColor: "#FFF",
                  trailColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  pathColor: "#FFF",
                  textSize: "2rem",
                })}
              />
            </div>
          </div>
          <img src={image} alt="Tower" className="course-card__right" />
        </div>
      </Link>
    );
  }
);

export default React.memo(CourseCard);
