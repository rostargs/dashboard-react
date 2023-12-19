import React from "react";
import { replaceNullWithFalse } from "../utils/replaceNullWithFalse";

type MenuItem = {
  name: string;
  img: string;
};

type ValidateMenuItem = {
  name: boolean | null;
  img: boolean | null;
};

const useValidateDropDown = <T extends MenuItem, Y extends ValidateMenuItem>(
  initialState: T,
  validateState: Y
) => {
  const [value, setValue] = React.useState<T>(initialState);
  const [validate, setValidate] = React.useState<Y>(validateState);
  const [rerender, setRerender] = React.useState(false);

  const onChooseMenuImage = (
    arr: React.RefObject<HTMLLIElement>[],
    index: number
  ) => {
    const target = arr[index]?.current;
    const liText = target && target?.textContent ? target.textContent : "";
    const imgSrc = target && target?.children[0].attributes[0].nodeValue;

    liText && imgSrc
      ? value.name !== liText && value.img !== imgSrc
        ? setValue((prev) => {
            return {
              ...prev,
              name: liText,
              img: imgSrc,
            };
          })
        : setValue((prev) => {
            return { ...prev, name: "", img: "" };
          })
      : null;
  };

  React.useEffect(() => {
    const { name, img } = value;

    if (rerender) {
      name.length && img.length
        ? setValidate((prev) => {
            return {
              ...prev,
              img: true,
              name: true,
            };
          })
        : setValidate((prev) => {
            return {
              ...prev,
              img: false,
              name: false,
            };
          });
    } else {
      setRerender(true);
    }
  }, [value]);

  const resetToDefault = (): void => {
    setValue(initialState);
    setValidate(validateState);
    setRerender(false);
  };

  const onError = (): void => {
    const updatedValidation = replaceNullWithFalse(validate);
    setValidate(updatedValidation);
  };

  return { value, validate, onChooseMenuImage, resetToDefault, onError };
};

export default useValidateDropDown;
