import React from "react";
import "./ModalWindow.scss";
import Error from "../../../public/error-modal.svg";
import Success from "../../../public/success-modal.svg";
import Info from '../../../public/info.svg'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setModalStatus } from "../../redux/slices/toggleSlice";

type TModal = {
  status: "error" | "success" | 'delete' | 'info';
  onConfirm: <T>(data: T) => void;
};

const modalImages = {
  error: Error,
  success: Success,
  delete: Error,
  info: Info
}

export type ModalTypes = Pick<TModal, 'status'>

const modalText =
  "This is place holder text. The basic dialog for modals should contain only valuable and relevant information. Simplify dialogs by removingunecessary elements or content that does not support user tasks. If youfind the number of required elements for your design are making thedialog excessively large, then try a different design solution.";

const ModalWindow: React.FC<TModal> = ({ status, onConfirm }) => {
  const dispatch = useDispatch();
  const { modalCourse } = useSelector((state: RootState) => state.toggle);
  return (
    <div className="modal">
      <div className="modal__header">
        <div className="modal__header-wrapper">
          <img
            src={modalImages[status]}
            alt={status}
            className="modal__header-img"
          />
          <span className="modal__header-status">
            {status === "success" ? "Success" : "Error"}
          </span>
        </div>
        <svg
          onClick={() => dispatch(setModalStatus(null))}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="modal__header-times"
        >
          <path
            d="M9.04958 7.98895L9.03853 8L9.04958 8.01105L12.9155 11.877C13.0069 11.9684 13.0069 12.1169 12.9155 12.2083L12.2083 12.9155C12.1169 13.0069 11.9684 13.0069 11.877 12.9155L11.216 12.2546L8.01105 9.04958L8 9.03853L7.98895 9.04958L4.1227 12.9155C4.0313 13.0069 3.88276 13.0069 3.79136 12.9155L3.08417 12.2083C2.99278 12.1169 2.99278 11.9684 3.08417 11.877L6.95042 8.01105L6.96147 8L6.95042 7.98895L3.08417 4.1227C2.99278 4.0313 2.99278 3.88276 3.08417 3.79136L3.79167 3.08418L3.79167 3.08417C3.88307 2.99278 4.03162 2.99278 4.12301 3.08417L7.98895 6.95042L8 6.96147L8.01105 6.95042L11.877 3.08449C11.9684 2.99309 12.1169 2.99309 12.2083 3.08449L12.9155 3.79167C13.0069 3.88307 13.0069 4.03162 12.9155 4.12301L12.2546 4.78395L9.04958 7.98895Z"
            fill="#9D9D99"
            stroke="#9D9D99"
            strokeWidth="0.03125"
          />
        </svg>
      </div>
      <p className="modal__paragraph">{modalText}</p>
      <div className="modal__bottom">
        {modalCourse?.status !== "error" && (
          <button
            onClick={() => dispatch(setModalStatus(null))}
            className="modal-button modal__bottom-cancel"
          >
            Cancel
          </button>
        )}
        <button
          className={`modal-button modal-button--${modalCourse?.status}`}
          onClick={onConfirm}
        >
          {modalCourse?.status === "error" && 'Change'}
          {modalCourse?.status === 'success' && 'Confirm'}
          {modalCourse?.status === 'delete' && 'Delete'}
          {modalCourse?.status === 'info' && 'Check'}
        </button>
      </div>
    </div>
  );
};

export default ModalWindow;
