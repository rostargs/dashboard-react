import React from "react";
import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Home from "./pages/Home/Home";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import CoursePage from "./pages/CoursePage/CoursePage";
import Courses from "./pages/Courses/Courses";
import Planning from "./pages/Planning/Planning";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "./pages/Settings/Settings";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import { updateAppealDate, updateTasks } from "./redux/slices/userSlice";
import Notifications from "./pages/Notifications/Notifications";
import NotificationSettings from "./components/NotificationSettings/NotificationSettings";
import Security from "./components/Security/Security";

function App() {
  const { isLogged } = useAppSelector(
    (state: RootState) => state.user.userData
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let interval: number;
    if (isLogged) {
      interval = setInterval(() => {
        const newTime = String(new Date());
        dispatch(updateAppealDate(newTime));
        dispatch(updateTasks());
      }, 60_000);
    }

    return () => clearTimeout(interval);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route path="course/:course" element={<CoursePage />} />
        <Route path="course" element={<Courses />} />
        <Route path="planning" element={<Planning />} />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountSettings />} />
          <Route path="notifications" element={<NotificationSettings/>} />
          <Route path="login&security" element={<Security/>} />
        </Route>
        <Route
          path="notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/account/:type" element={<Login />} />
    </Routes>
  );
}

export default App;
