import React from "react";
import "./Planning.scss";
import { RootState, useAppSelector } from "../../redux/store";
import { sortTaskSelect } from "../../redux/slices/userSlice";
import { renderAllSortedTasks } from "../../utils/renderAllSortedTasks";
import FatalError from "../../ui/FatalError/FatalError";
import Error from "../../../public/FatalError.svg";

const Planning: React.FC = () => {
  const tasksByDate = useAppSelector(sortTaskSelect);
  const { isLogged } = useAppSelector(
    (state: RootState) => state.user.userData
  );

  return (
    <div className="planning">
      <header className="planning__header">
        <h2 className="planning__title">Planning</h2>
      </header>
      <section className="planning__content">
        {tasksByDate.length && isLogged ? (
          renderAllSortedTasks(tasksByDate)
        ) : (
          <FatalError
            image={Error}
            text="Oops!"
            warn="There are no tasks found 😒"
          />
        )}
      </section>
    </div>
  );
};

export default Planning;
