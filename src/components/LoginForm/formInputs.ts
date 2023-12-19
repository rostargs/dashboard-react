import { Inputs } from "./LoginForm";

export type Input = {
  type: string;
  label: keyof Inputs;
  required?: string;
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
  placeholder?: string;
  pattern?:
    | RegExp
    | {
        value: RegExp;
        message: string;
      };
  changePassword?: boolean;
};
type TFormInputs = {
  [key in "login" | "signin" | "submitEmail" | 'change-password']: Input[];
};

export const formInputs: TFormInputs = {
  login: [
    {
      type: "text",
      label: "email",
      required: "Write your email",
      pattern: {
        value:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Invalid email",
      },
      placeholder: "Write your email",
    },
    {
      type: "password",
      label: "password",
      required: "Enter your password",
      placeholder: "Enter you password",
      changePassword: true,
    },
  ],
  signin: [
    {
      type: "text",
      label: "name",
      required: "Write your full name",
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
      required: "Write your email",
      pattern: {
        value:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Invalid email",
      },
      placeholder: "Write your email",
    },
    {
      type: "password",
      label: "password",
      required: "Enter your password",
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
  submitEmail: [
    {
      type: "text",
      label: "find email",
      required: "Write your email",
      pattern: {
        value:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message: "Invalid email",
      },
      placeholder: "Write your email",
    },
  ],
  "change-password": [
    {
        type: "password",
        label: "new password",
        required: "Enter a new password",
        placeholder: "Enter a new password",
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
      {
        type: "password",
        label: 'repeat password',
        required: "Write the new password again",
        placeholder: "Enter the new password again",
      },
  ]
};
