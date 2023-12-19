import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import toggleSlice from "./slices/toggleSlice";
import { useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice,
    toggle: toggleSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
