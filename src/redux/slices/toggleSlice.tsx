import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalTypes } from "../../ui/ModalWindow/ModalWindow";

type TToggle = {
  navigation: boolean;
  information: boolean;
  modalCourse: ModalTypes | null;
  taskForm: boolean;
};

const initialState: TToggle = {
  navigation: false,
  information: false,
  modalCourse: null,
  taskForm: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    onToggleInformation: (state) => {
      if (state.modalCourse === null && state.taskForm === false) {
        state.information = !state.information;
        state.navigation = false;
      }
    },
    onToggleNavigation: (state) => {
      if (state.modalCourse === null && state.taskForm === false) {
        state.navigation = !state.navigation;
        state.information = false;
      }
    },
    onClickOverlay: (state) => {
      state.information = false;
      state.navigation = false;
      state.taskForm = false;
    },
    onClickLink: (state) => {
      state.navigation = false;
      state.information = false;
    },
    setModalStatus: (state, action: PayloadAction<ModalTypes | null>) => {
      state.modalCourse = action.payload;
    },
    onToggleTaskForm: (state) => {
      state.taskForm = !state.taskForm;
    },
  },
});

export const {
  onToggleNavigation,
  onToggleInformation,
  onClickOverlay,
  onClickLink,
  setModalStatus,
  onToggleTaskForm,
} = toggleSlice.actions;

export default toggleSlice.reducer;
