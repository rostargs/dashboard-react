import { TCourse } from "../redux/slices/userSlice";
import { TDateTask } from "../redux/slices/userSlice";
import dayjs from "dayjs";

const sortTasksByDate = (tasks: TCourse): TDateTask[] => {
  if(!tasks.tasksByDate.length) return []
  const sortedArray = tasks.tasksByDate.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return +dateA - +dateB;
  });

  return sortedArray;
};

export const sortTasksByStartTime = (tasks: TCourse): TDateTask[] => {
  const sortedArray = sortTasksByDate(tasks);
  const sortedTasks: TDateTask[] = [];

  sortedArray.forEach((task) =>
    sortedTasks.push({
      date: task.date,
      tasks: [...task.tasks].sort((a, b) => {
        const startA = new Date(dayjs(a.start).format());
        const startB = new Date(dayjs(b.start).format());

        return +startA - +startB;
      }),
    })
  );

  return sortedTasks;
};