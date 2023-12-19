import React from "react";
import "./FormInput.scss";

type TForm = {
  title: string;
  name: string;
  status: boolean | null;
  value: string;
  placeholder?: string;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
};

const FormInput: React.FC<TForm> = React.memo(({
  title,
  name,
  status,
  value,
  placeholder,
  handleChangeInput,
  minLength,
  maxLength,
  errorMessage
}) => {
  return (
    <div className="form-input">
      <label htmlFor={name} className="form-input__label">
        {title}
      </label>

      <input
        name={name}
        className={`form-input__input ${
          status === null
            ? null
            : status
            ? "form-input__input__success"
            : "form-input__input__error"
        }`}
        type="text"
        id={name}
        value={value}
        onChange={handleChangeInput}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />

      {status === null ? null : (
        <span className={`info ${status ? "info__success" : "info__error"}`}>
          {status
            ? "Everything is good"
            : `${errorMessage ? errorMessage : `Fail..Min.length is ${minLength} symbols, max - ${maxLength}`}`}
        </span>
      )}
    </div>
  );
});

export default FormInput;
