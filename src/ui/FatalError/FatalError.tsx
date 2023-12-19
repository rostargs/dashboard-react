import React from "react";
import "./FatalError.scss";
import { Link } from "react-router-dom";

type TError = {
  image: string;
  text: string;
  warn: string;
  button?: string;
  path?: string | null;
  children?: React.ReactNode
};

const FatalError: React.FC<TError> = ({ image, text, warn, button, path, children }) => {
  return (
    <div className="fatal-error">
      <img src={image} alt="Fatal error" />
      <h3 className="fatal-error__text">{text}</h3>
      <p className="fatal-error__warn">{warn}</p>
      {button && path ? (
        <Link to={`/${path}`}>
          <div className="fatal-error__button">{button}</div>
        </Link>
      ) : null}
      {children}
    </div>
  );
};

export default React.memo(FatalError);
