import format from "date-fns/format";
import Task from "../components/Task/Task";
import { getHoursAndMinutes } from "./getHoursAndMinutes";
import { TDateTask } from "../redux/slices/userSlice";

export const renderAllSortedTasks = (tasks: TDateTask[]) => {
  return tasks.length
    ? tasks.map((date, index) => {
        return (
          <div key={index} className="task-block">
            <h1>{format(new Date(date.date), "PP")}</h1>
            <section>
              {date.tasks.map((task, i) => {
                return (
                  <Task
                    key={i}
                    size="lg"
                    activityType={task.img}
                    name={task.goal}
                    startTime={task.start ? getHoursAndMinutes(task.start) : ""}
                    endTime={task.end ? getHoursAndMinutes(task.end) : ""}
                    id={task.id}
                    date={task.selectedDay}
                    isCompleted={task.isCompleted}
                  />
                );
              })}
            </section>
          </div>
        );
      })
    : null;
};
