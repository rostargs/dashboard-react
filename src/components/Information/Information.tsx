import React from "react";
import "./Information.scss";
import Notification from "../../../public/notification.svg";
import Account from "../../../public/Account.svg";
import ArrowDown from "../../../public/chevron-down.svg";
import Stat from "../../../public/stat.svg";
import Times from "../../../public/times.svg";
import Stats from "../Stats/Stats";
import Overlay from "../../ui/Overlay/Overlay";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import {
  onClickLink,
  onToggleInformation,
} from "../../redux/slices/toggleSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  calculateAmountOfTasks,
  completedTaskDash,
  coursesData,
  logOut,
} from "../../redux/slices/userSlice";
import HoverMenu from "../../ui/HoverMenu/HoverMenu";
import Ring from "../../../public/RingNull.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Information: React.FC = () => {
  const navigate = useNavigate()
  const { newMessages } = useAppSelector(
    (state: RootState) => state.user.notifications
  );
  const { showNotifications } = useAppSelector(
    (state: RootState) => state.user.notifications
  );
  const { information, modalCourse, taskForm } = useAppSelector(
    (state: RootState) => state.toggle
  );
  const { amountOfActiveTasks, amountOfCompletedTasks } = useAppSelector(
    calculateAmountOfTasks
  );
  const { amountOfActiveCourses, amountOfCompletedCourses } =
    useAppSelector(coursesData);
  const { userData } = useAppSelector((state: RootState) => state.user);
  const data = useAppSelector(completedTaskDash);

  const dispatch = useAppDispatch();

  const accountStats = React.useMemo(
    () => [
      { name: "Courses Completed", value: amountOfCompletedCourses },
      { name: "Courses In Progress", value: amountOfActiveCourses },
      { name: "Finished tasks", value: amountOfCompletedTasks },
      { name: "Tasks In Progress", value: amountOfActiveTasks },
    ],
    []
  );

  return (
    <>
      <img
        src={information ? Times : Stat}
        alt="Open and toggle stats"
        onClick={() => dispatch(onToggleInformation())}
        style={modalCourse || taskForm ? { opacity: 0.3 } : { opacity: 1 }}
        className={information ? "statistics statistics-opened" : "statistics"}
      />
      {information ? <Overlay /> : null}
      <div
        className={
          information ? "information information-active" : "information"
        }
      >
        <div className="information__header">
          {showNotifications ? (
            <NavLink to="/notifications">
              {({ isActive }) => (
                <img
                  src={newMessages ? Notification : Ring}
                  style={
                    isActive
                      ? {
                          filter:
                            "drop-shadow(0rem 0.4rem 0.4rem rgba(54, 159, 255, 0.5))",
                        }
                      : {}
                  }
                  alt="Notification"
                />
              )}
            </NavLink>
          ) : (
            <div />
          )}
          {userData.isLogged ? (
            <div className="information__account">
              <img
                src={userData.avatar || Account}
                alt="Account"
                className="information__account-img"
              />
              <div className="information__account-info">
                <h4 className="information__account-name">{userData.name}</h4>
                <span className="information__account-plan">
                  {userData.email}
                </span>
              </div>
              <HoverMenu direction="down" hoverImage={ArrowDown}>
                <li
                  className="information__drop-down-items"
                  onClick={() => dispatch(logOut())}
                >
                  Log out
                </li>
                <Link
                  to="/settings"
                  className="information__drop-down-items"
                  onClick={() => {
                    navigate('/')
                    dispatch(onClickLink());
                  }}
                >
                  Settings
                </Link>
              </HoverMenu>
            </div>
          ) : (
            <Link to="/account/login">
              <button className="information__login">Log in</button>
            </Link>
          )}
        </div>
        <div className="information__statistic">
          <h2>Statistics</h2>
          <div className="information__statistic-wrapper">
            {accountStats.map((stats, i) => {
              return <Stats key={i} name={stats.name} progress={stats.value} />;
            })}
          </div>
        </div>
        <div className="information__activity">
          <h2>Activity</h2>
          <div className="information__activity-dash">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={100}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={15}
              >
                <XAxis
                  dataKey="day"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="amountOfTasks"
                  fill="#2d68a2"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
