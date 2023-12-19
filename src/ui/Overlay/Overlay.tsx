import React from "react";
import "./Overlay.scss";
import { useDispatch } from "react-redux";
import { onClickOverlay } from "../../redux/slices/toggleSlice";

const Overlay: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="overlay" onClick={() => dispatch(onClickOverlay())} />
  );
};

export default React.memo(Overlay);
