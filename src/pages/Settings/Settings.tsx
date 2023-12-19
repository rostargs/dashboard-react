import React from "react";
import "./Settings.scss";
import SettingsLink from "../../ui/SettingsLink/SettingsLink";
import { Outlet } from "react-router-dom";

const Settings: React.FC = () => {
  return (
    <div className="settings">
      <nav className="settings__navigation">
        <div className="settings__navigation-wrapper">
          <SettingsLink path="/settings" text="Account Settings" />
          <SettingsLink path="notifications" text="Notifications" />
          <SettingsLink path="login&security" text="Login & Security" />
          <hr className="settings__dash" />
        </div>
      </nav>
      <main className="settings__content">
        <Outlet/>
      </main>
    </div>
  );
};

export default Settings;
