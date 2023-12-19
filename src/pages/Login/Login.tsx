import React from "react";
import "./Login.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import Girl from "../../../public/GirlWithLaptop.png";
import Back from "../../../public/back.svg";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  
  return (
    <div className="login-page">
      <img src={Back} alt="Go back" onClick={goBack} />
      <div className="container">
        <div className="login">
          <div className="login__menu">
            <LoginForm />
            <img src={Girl} alt="Girl with laptop" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
