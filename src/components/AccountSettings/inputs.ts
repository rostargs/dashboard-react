import { Input } from "../LoginForm/formInputs";

type TAccountInputs = {
  [key in string]: Input[];
};

export const accountInputs: TAccountInputs = {
  settings: [
    {
      type: "text",
      label: "name",
      required: "Your full name",
      placeholder: "Write your name",
      minLn: {
        value: 2,
        message: "Minimun length is 2 symbols",
      },
      maxLn: {
        value: 16,
        message: "Maximum length is 16 symbols",
      },
    },
    {
      type: "text",
      label: "email",
      required: "Your email",
      pattern: {
        value:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Invalid email",
      },
      placeholder: "Email",
    },
    {
      type: "password",
      label: "password",
      required: "Your password",
      placeholder: "Enter your password",
      pattern: {
        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        message: "Must contain A-z, 0-9, spec.symbol",
      },
      minLn: {
        value: 6,
        message: "Minimum length is 6 symbols",
      },
      maxLn: {
        value: 16,
        message: "Maximum length is 16 symbols",
      },
    },
  ],
};
