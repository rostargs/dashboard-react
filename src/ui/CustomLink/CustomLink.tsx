import React from "react";
import "./CustomLink.scss";
import { NavLink } from "react-router-dom";
import { onClickLink } from "../../redux/slices/toggleSlice";
import { useAppDispatch } from "../../redux/store";

type TCustomLink = {
  name: string;
  src: string;
  imageD: string;
};

const CustomLink: React.FC<TCustomLink> = ({ name, src, imageD }) => {
  const dispatch = useAppDispatch();
  const colors = {
    active: "#369FFF",
    unactive: "#BDBDBD",
  };

  const onToggleActiveLink = ({ isActive }: { isActive: boolean }): string => {
    return `link ${isActive ? "active-link" : ""}`;
  };

  return (
    <li className="custom-link__item" onClick={() => dispatch(onClickLink())}>
      <NavLink to={src} className={onToggleActiveLink}>
        {({ isActive }: { isActive: boolean }) => (
          <>
            <svg
              className="custom-link__image"
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={imageD}
                fill={isActive ? colors.active : colors.unactive}
              />
            </svg>
            {name}
          </>
        )}
      </NavLink>
    </li>
  );
};

export default React.memo(CustomLink);
