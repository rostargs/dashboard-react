import React from "react";
import "./Input.scss";
import { Path, UseFormRegister } from "react-hook-form";
import { Inputs } from "../../components/LoginForm/LoginForm";

type TLoginInput = {
  label: Path<Inputs>;
  register: UseFormRegister<Inputs>;
  required?: boolean | string;
  type: string;
  minLn?:
    | number
    | {
        value: number;
        message: string;
      };
  maxLn?:
    | number
    | {
        value: number;
        message: string;
      };
  error?: string;
  placeholder?: string;
  pattern?:
    | RegExp
    | {
        value: RegExp;
        message: string;
      };
  changePassword?: boolean;
  handleForgetPassword?: () => void;
  className?: string;
};

const Input: React.FC<TLoginInput> = ({
  label,
  register,
  required,
  type,
  minLn,
  maxLn,
  error,
  placeholder,
  pattern,
  changePassword,
  handleForgetPassword,
  className,
}) => {
  const id = React.useId();
  return (
    <div className={"login-input"}>
      <div
        className={className ? `${className}__wrapper` : "login-input__wrapper"}
      >
        <label
          htmlFor={`${label}-${id}`}
          className={className ? `${className}__label` : "login-input__label"}
        >
          {label}
        </label>
        {changePassword && (
          <span className="forgot-password" onClick={handleForgetPassword}>
            Forgot the pasword ?
          </span>
        )}
      </div>
      <input
        className={className ? `${className}__input` : "login-input__input"}
        type={type}
        id={`${label}-${id}`}
        {...register(label, {
          required: required,
          minLength: minLn,
          maxLength: maxLn,
          pattern: pattern,
        })}
        placeholder={placeholder}
      />
      {error && <span className={"login-input__error"}>{error}</span>}
    </div>
  );
};

export default Input;
