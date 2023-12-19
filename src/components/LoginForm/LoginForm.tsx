import React from "react";
import "./LoginForm.scss";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Logo from "../../../public/logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../ui/Input/Input";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { formInputs } from "./formInputs";
import {
  changePassword,
  createAccount,
  toggleLogAccount,
} from "../../redux/slices/userSlice";

export enum Params {
  FORGET_PASSWORD = "forget-password",
}

type TLoginForm = {
  type: "login" | "signin" | "change-password";
};

export type Inputs = {
  name: string;
  email: string;
  password: string;
  "find email": string;
  "new password": string;
  "repeat password": string;
};

enum Errors {
  LOGIN_ERROR = "Invalid email or password",
  SIGN_IN_ERROR = "Fill out the form correctly",
  FORGOT_PASSWORD_ERROR = "Passwords don't match",
  CANT_FINT_EMAIL = "Can't find this email",
}

const LoginForm: React.FC = () => {
  const { type } = useParams<TLoginForm>();
  const [serchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    reset();
  }, [location.pathname, serchParams.get(Params.FORGET_PASSWORD)]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const { email, password } = useAppSelector(
    (state: RootState) => state.user.userData
  );
  const navigate = useNavigate();
  const [error, setError] = React.useState<null | Errors>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!serchParams.get(Params.FORGET_PASSWORD)) {
      if (type === "login") {
        if (email === data.email && password === data.password) {
          dispatch(toggleLogAccount(true));
          navigate("/");
        } else {
          setError(Errors.LOGIN_ERROR);
        }
      }
      if (type === "signin") {
        const userData = {
          name: data.name,
          password: data.password,
          email: data.email,
        };
        dispatch(createAccount(userData));
        dispatch(toggleLogAccount(true));
        navigate("/");
      }
      if (type === "change-password") {
        if (data["new password"] === data["repeat password"]) {
          dispatch(changePassword(data["new password"]));
          navigate("/account/login");
        } else {
          setError(Errors.FORGOT_PASSWORD_ERROR);
        }
      }
    } else {
      email === data["find email"]
        ? navigate("/account/change-password")
        : setError(Errors.CANT_FINT_EMAIL);
    }
  };

  const handleForgotPassword = () => {
    setSearchParams(`${Params.FORGET_PASSWORD}=true`);
  };

  const renderFormInputs = () => {
    const forgotPassword = serchParams.get(Params.FORGET_PASSWORD);
    const inputsToRender = forgotPassword
      ? formInputs["submitEmail"]
      : type && formInputs[type];
    return (
      inputsToRender &&
      inputsToRender.map((item, i) => {
        return (
          <Input
            key={i}
            error={errors[item.label]?.message}
            register={register}
            {...item}
            handleForgetPassword={handleForgotPassword}
          />
        );
      })
    );
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Link to="/">
        <img src={Logo} alt="logo" className="login-form__logo" />
      </Link>
      <h3 className="login-form__greeting">Welcome back!!!</h3>
      <h1 className="login-form__title">{type}</h1>

      {error ? <span className="login-form__error">{error}</span> : null}

      <div className="login-form__inputs">{renderFormInputs()}</div>
      <button type="submit" className="login-form__submit">
        Submit
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="8"
          viewBox="0 0 18 8"
          fill="none"
        >
          <path
            d="M0.562487 5.40625H14.7469L11.3648 1.11719C11.2687 0.995313 11.3555 0.8125 11.5125 0.8125H13.0312C13.2609 0.8125 13.4789 0.917969 13.6195 1.09844L17.4633 5.97344C17.85 6.46563 17.5008 7.1875 16.875 7.1875H0.562487C0.459362 7.1875 0.374987 7.10313 0.374987 7V5.59375C0.374987 5.49062 0.459362 5.40625 0.562487 5.40625Z"
            fill="white"
          />
        </svg>
      </button>

      <span className="login-form__create-account">
        {type === "change-password" ? null : type === "login" ? (
          <>
            Don’t have an account yet?
            <Link to="/account/signin">Sign up for free</Link>
          </>
        ) : (
          <>
            Already have an account?
            <Link to="/account/login">Log in here</Link>
          </>
        )}
      </span>
    </form>
  );
};

export default LoginForm;
