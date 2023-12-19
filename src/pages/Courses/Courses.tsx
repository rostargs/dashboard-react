import React from "react";
import "./Courses.scss";
import SearchInput from "../../ui/SearchInput/SearchInput";
import { RootState, useAppSelector } from "../../redux/store";
import FatalError from "../../ui/FatalError/FatalError";
import Question from "../../../public/Question.svg";
import { useSearchParams } from "react-router-dom";
import { renderAllCourseCards } from "../../utils/renderAllCourseCard";

const Courses: React.FC = () => {
  const [searchCoursesParams] = useSearchParams();

  const allCourses = useAppSelector((state: RootState) => state.user.courses);
  const { isLogged } = useAppSelector(
    (state: RootState) => state.user.userData
  );
  return (
    <div className="courses-page">
      <header className="courses-page__header">
        <h2 className="courses-page__title">All courses</h2>
        <SearchInput />
      </header>
      <main
        className="courses-page__courses"
        style={
          allCourses.length &&
          isLogged &&
          !allCourses.filter(
            (courses) =>
              !courses.language.includes(
                searchCoursesParams.get("search-course")?.toLocaleLowerCase() ||
                  ""
              )
          ).length
            ? {}
            : { gridTemplateColumns: "1fr" }
        }
      >
        {isLogged ? (
          renderAllCourseCards(allCourses, searchCoursesParams)
        ) : (
          <FatalError
            image={Question}
            text="Oops!"
            warn="There is no course found. Please click below to add your course"
            button="Create course"
            path="create-course"
          />
        )}
      </main>
    </div>
  );
};

export default Courses;
