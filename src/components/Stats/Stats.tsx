import React from "react";
import "./Stats.scss";

type TStat = {
  name: string,
  progress: number
}

const Stats: React.FC<TStat> = ({name, progress}) => {
  return (
    <div className="stat">
      <h3 className="stat__name">{name}</h3>
      <span className="stat__progress">{progress}</span>
    </div>
  );
};

export default Stats;
