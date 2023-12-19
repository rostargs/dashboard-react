import React from "react";
import "./Security.scss";
import SettingsField from "../../ui/SettingsField/SettingsField";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { logOut } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setModalStatus } from "../../redux/slices/toggleSlice";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import Overlay from "../../ui/Overlay/Overlay";

const Security: React.FC = () => {
  const { modalCourse } = useAppSelector((state: RootState) => state.toggle);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const onDeleteAccount = () => {
    dispatch(setModalStatus({ status: "delete" }));
  };
  const onConfirm = () => {
    localStorage.removeItem("userData");
    dispatch(setModalStatus(null));
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="security">
      <SettingsField text="Log out">
        <button className="logout-btn" onClick={onLogOut}>
          Log out
        </button>
      </SettingsField>
      <SettingsField text="Delete account">
        <button className="delete-account-btn" onClick={onDeleteAccount}>
          Delete account
        </button>
      </SettingsField>
      {modalCourse?.status ? (
        <ModalWindow status={modalCourse.status} onConfirm={onConfirm} />
      ) : null}
      {modalCourse ? <Overlay /> : null}
    </div>
  );
};

export default Security;
