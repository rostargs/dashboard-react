import React from "react";
import "./SettingsField.scss";

type TSettingsField = {
  text: string;
  children?: React.ReactNode;
};

const SettingsField: React.FC<TSettingsField> = ({ text, children }) => {
  return (
    <div className="settings-field">
      {text}
      <div>{children}</div>
    </div>
  );
};

export default SettingsField;
