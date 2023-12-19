import React from "react";
import "./HoverMenu.scss";

type THoverMenu = {
  isCompleted?: boolean | 'expired';
  children?: React.ReactNode;
  hoverImage?: string;
  withTile?: boolean;
  direction: "up" | "down";
};

const HoverMenu: React.FC<THoverMenu> = ({
  isCompleted,
  children,
  hoverImage,
  withTile,
  direction,
}) => {
  const [showOptionMenu, setShowOptionMenu] = React.useState(false);

  let timeout: number;

  const onMouseEnterOption = () => {
    setShowOptionMenu(true);
    clearTimeout(timeout);
  };

  const onMouseLeaveOption = () => {
    timeout = setTimeout(() => {
      setShowOptionMenu((prev) => !prev);
    }, 100);
  };

  const onMouseEnterMenu = () => {
    clearTimeout(timeout);
  };
  return (
    <div className="hover-menu">
      {hoverImage ? (
        <img
          src={hoverImage}
          alt="Hover image"
          onMouseEnter={onMouseEnterOption}
          onMouseLeave={onMouseLeaveOption}
          className="hover-menu__image"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="18"
          viewBox="0 0 4 18"
          fill="none"
          onMouseEnter={onMouseEnterOption}
          onMouseLeave={onMouseLeaveOption}
          className="hover-menu__more"
        >
          <g clipPath="url(#clip0_501_4267)">
            <path
              d="M2 11C3.10457 11 4 10.1046 4 9C4 7.89543 3.10457 7 2 7C0.89543 7 0 7.89543 0 9C0 10.1046 0.89543 11 2 11Z"
              fill={isCompleted ? "#FFF" : "#909090"}
            />
            <path
              d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
              fill={isCompleted ? "#FFF" : "#909090"}
            />
            <path
              d="M2 18C3.10457 18 4 17.1046 4 16C4 14.8954 3.10457 14 2 14C0.89543 14 0 14.8954 0 16C0 17.1046 0.89543 18 2 18Z"
              fill={isCompleted ? "#FFF" : "#909090"}
            />
          </g>
          <defs>
            <clipPath id="clip0_501_4267">
              <rect width="4" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {showOptionMenu ? (
        <ul
          onMouseEnter={onMouseEnterMenu}
          onMouseLeave={onMouseLeaveOption}
          className={`hover-menu__option menu-${direction}`}
          style={
            withTile
              ? { transform: `translateX(-70%)` }
              : {}
          }
        >
          {withTile ? <div className="triangle" /> : null}
          {children}
        </ul>
      ) : null}
    </div>
  );
};

export default HoverMenu;
