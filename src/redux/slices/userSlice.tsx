import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TaskType } from "../../pages/CoursePage/CoursePage";
import { RootState } from "../store";

export type TUser = {
  userData: {
    email: string;
    name: string;
    password: string;
    avatar: string | null;
    isLogged: boolean;
  };
  appealData: string;
  courses: TCourse[];
  notifications: {
    showNotifications: boolean;
    newMessages: boolean;
    children: TNotifications[];
  };
};

type TNotifications = {
  id: string;
  type: "congratulations" | "fail";
  isRead: boolean;
  expiredDate: string;
  isDeleted: boolean;
  expiredTasks?: TTask[];
  course?: TCourse;
};

export type TCourse = {
  isFinished: boolean;
  id: string;
  language: string;
  goal: string;
  backgroundColor: { r: number; g: number; b: number };
  imageStyle: {
    name: string;
    img: string;
  };
  tasksByDate: TDateTask[];
};

export type TDateTask = {
  date: string;
  tasks: TTask[];
};

export type TTask = {
  id: string;
  start: string | null;
  end: string | null;
  selectedDay: string;
  isCompleted: boolean | "expired";
  goal: string;
  name: TaskType | string;
  img: string;
};

const storage = localStorage.getItem("userData");
const userData: TUser =
  storage !== null
    ? JSON.parse(storage)
    : {
        userData: {},
        courses: [],
        appealData: String(new Date()),
        notifications: {
          showNotifications: true,
          newMessages: false,
          children: [],
        },
      };

const initialState: TUser = {
  ...userData,
};

type TOnlyCourse = Omit<TCourse, "tasksByDate" | "id" | "isFinished">;
type TOnlyTask = Omit<TTask, "id" | "isCompleted">;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<TOnlyCourse>) => {
      if (
        !state.courses.find(
          (course) => course.language === action.payload.language
        )
      ) {
        state.courses.push({
          id: uuidv4(),
          ...action.payload,
          tasksByDate: [],
          isFinished: false,
        });
        localStorage.setItem("userData", JSON.stringify(state));
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      const filtredState = state.courses.filter(
        (course) => course.id !== action.payload
      );
      state.courses = [...filtredState];
      localStorage.setItem("userData", JSON.stringify(state));
    },
    addTaskToCourse: (
      state,
      action: PayloadAction<{ task: TOnlyTask; target: string }>
    ) => {
      const course = state.courses.findIndex(
        (course) => course.id === action.payload.target
      );
      if (!state.courses[course].tasksByDate.length) {
        state.courses[course].tasksByDate.push({
          date: action.payload.task.selectedDay,
          tasks: [{ id: uuidv4(), ...action.payload.task, isCompleted: false }],
        });
      } else {
        const dateIndex = state.courses[course].tasksByDate.findIndex(
          (task) => task.date === action.payload.task.selectedDay
        );

        if (dateIndex === -1) {
          state.courses[course].tasksByDate.push({
            date: action.payload.task.selectedDay,
            tasks: [
              { id: uuidv4(), ...action.payload.task, isCompleted: false },
            ],
          });
        } else {
          state.courses[course].tasksByDate[dateIndex].tasks.push({
            id: uuidv4(),
            ...action.payload.task,
            isCompleted: false,
          });
        }
      }
      localStorage.setItem("userData", JSON.stringify(state));
    },
    deleteTaskFromCourse: (
      state,
      action: PayloadAction<{ date: string; task: string }>
    ) => {
      const courseId = state.courses.findIndex((course) =>
        course.tasksByDate.find((tasks) =>
          tasks.tasks.find((task) => task.id === action.payload.task)
        )
      );
      const taskByDateId = state.courses[courseId].tasksByDate.findIndex(
        (tasks) => tasks.date === action.payload.date
      );
      const taskId = state.courses[courseId].tasksByDate[
        taskByDateId
      ].tasks.findIndex((task) => task.id === action.payload.task);
      if (courseId !== -1 && taskByDateId !== -1 && taskId !== -1) {
        state.courses[courseId].tasksByDate[taskByDateId].tasks.splice(
          taskId,
          1
        );
      }

      if (!state.courses[courseId].tasksByDate[taskByDateId].tasks.length) {
        state.courses[courseId].tasksByDate.splice(taskByDateId, 1);
      }

      localStorage.setItem("userData", JSON.stringify(state));
    },
    completeTask: (
      state,
      action: PayloadAction<{ date: string; task: string }>
    ) => {
      const courseId = state.courses.findIndex((course) =>
        course.tasksByDate.find((tasks) =>
          tasks.tasks.find((task) => task.id === action.payload.task)
        )
      );
      const taskByDateId = state.courses[courseId].tasksByDate.findIndex(
        (tasks) => tasks.date === action.payload.date
      );
      const taskId = state.courses[courseId].tasksByDate[
        taskByDateId
      ].tasks.findIndex((task) => task.id === action.payload.task);

      if (courseId !== -1 && taskByDateId !== -1 && taskId !== -1) {
        state.courses[courseId].tasksByDate[taskByDateId].tasks[
          taskId
        ].isCompleted =
          !state.courses[courseId].tasksByDate[taskByDateId].tasks[taskId]
            .isCompleted;
      }

      localStorage.setItem("userData", JSON.stringify(state));
    },
    createAccount: (
      state,
      action: PayloadAction<{ email: string; name: string; password: string }>
    ) => {
      state.userData = { ...action.payload, avatar: null, isLogged: true };
      localStorage.setItem("userData", JSON.stringify(state));
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.userData.password = action.payload;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    toggleLogAccount: (state, action: PayloadAction<boolean>) => {
      state.userData.isLogged = action.payload;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    completeCourse: (state, action: PayloadAction<string>) => {
      const courseIndex = state.courses.findIndex(
        (course) => course.id === action.payload
      );

      state.courses[courseIndex].isFinished = true;

      state.notifications.children.push({
        id: uuidv4(),
        type: "congratulations",
        isRead: false,
        isDeleted: false,
        expiredDate: String(new Date()),
        course: state.courses[courseIndex],
      });

      state.notifications.newMessages = true;

      localStorage.setItem("userData", JSON.stringify(state));
    },
    changeAccountInfo: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        name: string;
        avatar: string | null;
      }>
    ) => {
      state.userData = { ...action.payload, isLogged: state.userData.isLogged };
      localStorage.setItem("userData", JSON.stringify(state));
    },
    updateAppealDate: (state, action: PayloadAction<string>) => {
      state.appealData = action.payload;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    updateTasks: (state) => {
      let checkForUpdates = 0;
      const updatedCourses = state.courses.map((course) => {
        const updatedTasksByDate = course.tasksByDate.map((tasks) => {
          const updatedTasks = tasks.tasks.map((task) => {
            if (task.end === null) return task;
            if (new Date(task.end) < new Date() && task.isCompleted === false) {
              checkForUpdates++;
              return { ...task, isCompleted: "expired" as "expired" };
            } else {
              return task;
            }
          });
          return { ...tasks, tasks: updatedTasks };
        });
        return { ...course, tasksByDate: updatedTasksByDate };
      });

      if (checkForUpdates !== 0) {
        state.notifications.newMessages = true;
      }

      state.courses = [...updatedCourses];

      const expiredTaksUpdate: TTask[] = [];

      state.courses.forEach((course) => {
        course.tasksByDate.forEach((tasks) => {
          tasks.tasks.forEach((task) => {
            if (task.isCompleted === "expired") {
              if (
                !state.notifications.children.some((notification) =>
                  notification.expiredTasks?.some(
                    (taskEx) => taskEx.id === task.id
                  )
                )
              ) {
                expiredTaksUpdate.push(task);
              }
            }
          });
        });
      });

      if (expiredTaksUpdate.length !== 0) {
        state.notifications.children.push({
          id: uuidv4(),
          type: "fail",
          isRead: false,
          isDeleted: false,
          expiredDate: String(new Date()),
          expiredTasks: [...expiredTaksUpdate],
        });
      }

      localStorage.setItem("userData", JSON.stringify(state));
    },
    onReadAllMessages: (state) => {
      state.notifications.children = state.notifications.children.map(
        (notification) => ({
          ...notification,
          isRead: true,
        })
      );
      state.notifications.newMessages = false;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    onDeleteExactMessage: (state, action: PayloadAction<string>) => {
      const id = state.notifications.children.findIndex(
        (notification) => notification.id === action.payload
      );

      if (id !== -1) {
        state.notifications.children[id].isDeleted = true;
      }
      localStorage.setItem("userData", JSON.stringify(state));
    },
    onReadExactMessage: (state, action: PayloadAction<string>) => {
      const id = state.notifications.children.findIndex(
        (notification) => notification.id === action.payload
      );
      if (id !== -1) {
        state.notifications.children[id].isRead = true;
      }
      const isAllMessagesRead = state.notifications.children.every(
        (message) => message.isRead
      );
      if (isAllMessagesRead) state.notifications.newMessages = false;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    toggleNotification: (state) => {
      state.notifications.showNotifications =
        !state.notifications.showNotifications;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    clearAllMessages: (state) => {
      state.notifications.children = [];
      state.notifications.newMessages = false;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    logOut: (state) => {
      state.notifications.newMessages = false;
      state.userData.isLogged = false;
      localStorage.setItem("userData", JSON.stringify(state));
    },
  },
});

export const {
  addCourse,
  addTaskToCourse,
  deleteCourse,
  deleteTaskFromCourse,
  completeTask,
  createAccount,
  changePassword,
  toggleLogAccount,
  completeCourse,
  changeAccountInfo,
  updateAppealDate,
  updateTasks,
  onReadAllMessages,
  onDeleteExactMessage,
  onReadExactMessage,
  toggleNotification,
  clearAllMessages,
  logOut,
} = userSlice.actions;

const selectTaks = (state: RootState) => state.user.courses;
const selectCourses = (state: RootState) => state.user;
const selectAccount = (state: RootState) => state.user.userData;

export const taskSelect = createSelector([selectTaks], (tasks) => {
  const arrayOfTasks: TTask[] = [];
  tasks.forEach((course) => {
    if (!course.isFinished) {
      course.tasksByDate.forEach((tasks) =>
        tasks.tasks.forEach((task) => arrayOfTasks.push(task))
      );
    }
  });

  return arrayOfTasks;
});

export const sortTaskSelect = createSelector([selectTaks], (tasks) => {
  const tasksByDate: TDateTask[] = [];

  tasks.forEach((course) => {
    if (!course.isFinished) {
      course.tasksByDate.forEach((taskGroup) => {
        const dateIndex = tasksByDate.findIndex(
          (item) => item.date === taskGroup.date
        );

        if (dateIndex !== -1) {
          tasksByDate[dateIndex].tasks.push(...taskGroup.tasks);
        } else {
          tasksByDate.push({ ...taskGroup, tasks: [...taskGroup.tasks] });
        }
      });
    }
  });

  return tasksByDate;
});

export const calculateAmountOfTasks = createSelector(
  [selectCourses, selectAccount],
  (course, user) => {
    let amountOfCompletedTasks = 0;
    let amountOfActiveTasks = 0;

    if (user.isLogged) {
      course.courses.forEach((course) =>
        course.tasksByDate.forEach((tasks) =>
          tasks.tasks.forEach((task) =>
            task.isCompleted === true
              ? amountOfCompletedTasks++
              : task.isCompleted === false && amountOfActiveTasks++
          )
        )
      );
    }

    return { amountOfCompletedTasks, amountOfActiveTasks };
  }
);

export const coursesData = createSelector(
  [selectCourses, selectAccount],
  (courses, user) => {
    let amountOfCompletedCourses = 0;
    let amountOfActiveCourses = 0;

    if (user.isLogged) {
      amountOfCompletedCourses = courses.courses.reduce((acc, current) => {
        return (acc += current.isFinished ? 1 : 0);
      }, 0);
      amountOfActiveCourses = courses.courses.reduce((acc, current) => {
        return (acc += current.isFinished ? 0 : 1);
      }, 0);
    }

    return { amountOfCompletedCourses, amountOfActiveCourses };
  }
);

export const completedTaskDash = createSelector(
  [selectTaks, selectAccount],
  (tasks, user) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dashTasks: { day: string; amountOfTasks: number }[] = [];

    const allDaysData = days.map((day) => ({
      day,
      amountOfTasks: 0,
    }));

    if (user.isLogged) {
      tasks.forEach((course) => {
        course.tasksByDate.forEach((tasks) => {
          let completedTasks = 0;
          tasks.tasks.forEach((task) => {
            task.isCompleted === true && completedTasks++;
          });
          dashTasks.push({
            day: days[new Date(tasks.date).getDay()],
            amountOfTasks: completedTasks,
          });
        });
      });
    }

    const result = allDaysData.map((emptyDay) => {
      const matchingTask = dashTasks.find((task) => task.day === emptyDay.day);
      return matchingTask || emptyDay;
    });

    return result;
  }
);

export default userSlice.reducer;
