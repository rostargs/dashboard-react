import React from "react";
import "./DropDown.scss";

type TDrowDownMenu = {
  isActive: boolean;
  title: string;
  placeholder: string;
  items: TItem[];
  onChooseMenuImage: (
    arr: React.RefObject<HTMLLIElement>[],
    index: number
  ) => void;
  onToggleMenu: () => void;
  selectedOption: { name: string; img: string };
  isValidate: { name: null | boolean; img: null | boolean };
};

type TItem = {
  name: string;
  img: string;
};

const DropDown: React.FC<TDrowDownMenu> = ({
  isActive,
  title,
  placeholder,
  items,
  onChooseMenuImage,
  onToggleMenu,
  selectedOption,
  isValidate,
}) => {
  const liRef: React.RefObject<HTMLLIElement>[] = React.useRef(
    items.map(() => React.createRef<HTMLLIElement>())
  ).current;
  const { name, img } = selectedOption;

  const isInvalidNameAndImg =
    isValidate.name === false && isValidate.img === false;
  const isNameAndImgValid = isValidate.name && isValidate.img;
  const isEmpty = isValidate.name === null && isValidate.img === null;
  const validateColor = isInvalidNameAndImg
    ? "#EB5757"
    : isNameAndImgValid
    ? "#75CC6D"
    : "#7A5CFA";

  const fill =
    isActive && isEmpty ? validateColor : !isEmpty ? validateColor : "#666";

  return (
    <div className="dropdown-menu">
      <label className="dropdown-menu__label" onClick={onToggleMenu}>
        {title}
      </label>
      <div
        className={`dropdown-menu__toggler ${
          isValidate.name && isValidate.img
            ? "dropdown-menu__toggler-choosed"
            : ""
        } ${isActive ? "dropdown-menu__toggler-active" : ""} ${
          isValidate.name === false && isValidate.img === false
            ? "dropdown-menu__toggler-error"
            : ""
        }`}
        onClick={onToggleMenu}
      >
        {placeholder}
        <svg
          className={isActive ? "active-arrow" : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_1_105)">
            <path
              d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0_1_105">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {isActive ? (
        <ul className="dropdown-menu__options">
          {items.map((item, i) => {
            return (
              <li
                ref={liRef[i]}
                className={`dropdown-menu__options-item ${
                  name === item.name && img === item.img
                    ? "dropdown-menu__options-item-active"
                    : ""
                }`}
                key={i}
                onClick={() => onChooseMenuImage(liRef, i)}
              >
                {item.name}
                <img src={item.img} alt={item.name} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;
