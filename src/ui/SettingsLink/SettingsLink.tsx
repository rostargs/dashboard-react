import React from "react";
import "./SettingsLink.scss";
import { NavLink } from "react-router-dom";

type TSettingsLink = {
  path: string;
  text: string;
};

const SettingsLink: React.FC<TSettingsLink> = ({ path, text }) => {
  const onToggleActiveLink = ({ isActive }: { isActive: boolean }): string => {
    return `settings-link ${isActive ? "settings-link-active" : ""}`;
  };
  
  return (
    <NavLink to={path} className={onToggleActiveLink} end>
      {text}
    </NavLink>
  );
};

export default React.memo(SettingsLink);
