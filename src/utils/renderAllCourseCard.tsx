import { TCourse } from "../redux/slices/userSlice";
import FatalError from "../ui/FatalError/FatalError";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseNotFound from "../../public/CourseNotFound.svg";
import Question from "../../public/Question.svg";

export const renderAllCourseCards = (
  allCourses: TCourse[],
  params: URLSearchParams
) => {
  const searchValue = params.get("search-course")?.toLocaleLowerCase() || "";
  const dataToRender = allCourses.filter((courses) =>
    courses.language.toLocaleLowerCase().includes(searchValue)
  );
  if (allCourses.length && !dataToRender.length) {
    return (
      <FatalError
        image={CourseNotFound}
        text="Oops!"
        warn="There is no course found.."
      />
    );
  }
  return allCourses.length ? (
    dataToRender.map((course, index) => {
      const filteredTasks = course.tasksByDate.flatMap((tasks) =>
        tasks.tasks.filter((task) => task.isCompleted !== "expired")
      );

      const amountOfTasks = course.tasksByDate.reduce(
        (acc, current) => (acc += current.tasks.length),
        0
      );

      const amountOfCompletedTasks = course.tasksByDate.reduce(
        (acc, current) =>
          (acc += current.tasks.reduce(
            (acc, current) => (acc += current.isCompleted === true ? 1 : 0),
            0
          )),
        0
      );
      const stat = Number(
        Math.round((amountOfCompletedTasks / filteredTasks.length) * 100)
      );
      return (
        <CourseCard
          path={course.id}
          key={index}
          title={course.language}
          image={course.imageStyle.img}
          color={course.backgroundColor}
          tasks={amountOfTasks}
          progress={stat}
          isCompleted={course.isFinished}
        />
      );
    })
  ) : (
    <FatalError
      image={Question}
      text="Oops!"
      warn="There is no course found. Please click below to add your course"
      button="Create course"
      path="create-course"
    />
  );
};
