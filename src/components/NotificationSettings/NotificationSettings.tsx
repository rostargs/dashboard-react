import React from "react";
import SettingsField from "../../ui/SettingsField/SettingsField";
import "./NotificationSettings.scss";
import { Switch } from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import {
  clearAllMessages,
  toggleNotification,
} from "../../redux/slices/userSlice";

const NotificationSettings: React.FC = () => {
  const { showNotifications } = useAppSelector(
    (state: RootState) => state.user.notifications
  );
  const dispatch = useAppDispatch();

  const onToggleNotification = () => {
    dispatch(toggleNotification());
  };

  return (
    <div className="notification-settings">
      <SettingsField
        text={showNotifications ? "Hide notifications" : "Show notification"}
      >
        <Switch
          color="primary"
          checked={showNotifications}
          onChange={onToggleNotification}
        />
      </SettingsField>
      <SettingsField text="Clear all messages">
        <button
          className="clear-btn"
          onClick={() => dispatch(clearAllMessages())}
        >
          Clear
        </button>
      </SettingsField>
    </div>
  );
};

export default NotificationSettings;
