import React from "react";
import { replaceNullWithFalse } from "../utils/replaceNullWithFalse";

const useValidateInput = <T, Y>(initialState: T, validateState: Y) => {
  const [value, setValue] = React.useState<T>(initialState);
  const [validate, setValidate] = React.useState<Y>(validateState);

  const handleChangeInput = React.useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value, minLength, maxLength } = event.target;
  
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (value) {
      const trimmedValue = value.trim();
      setValidate((prev) => ({
        ...prev,
        [name]: trimmedValue.length >= minLength && trimmedValue.length <= maxLength,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  }, [setValue, setValidate]);

  const resetToDefault = (): void => {
    setValue(initialState)
    setValidate(validateState);
  };

  const onError = (): void => {
    const updatedValidation = replaceNullWithFalse(validate);
    setValidate(updatedValidation);
  };

  const errorOnCertainInput = (name: string): void => {
    setValidate((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
  };

  return {
    value,
    validate,
    handleChangeInput,
    resetToDefault,
    onError,
    errorOnCertainInput,
  };
};

export default useValidateInput;
