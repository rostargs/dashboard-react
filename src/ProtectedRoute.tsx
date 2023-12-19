import React from "react";
import { RootState, useAppSelector } from "./redux/store";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<TProtectedRoute> = ({ children }) => {
  const { isLogged } = useAppSelector(
    (state: RootState) => state.user.userData
  );
  if (!isLogged) {
    return <Navigate to='/account/login' replace />
  }
  return children;
};

export default ProtectedRoute;
