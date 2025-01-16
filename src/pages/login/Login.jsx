import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../apiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate for consistent navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: emailRef.current.value, password: passwordRef.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Hub</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social Hub.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={passwordRef}
              minLength="6"
              required
            />
            <button
              className={`loginButton ${isFetching ? "disabledButton" : ""}`}
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className={`loginRegisterButton ${
                isFetching ? "disabledButton" : ""
              }`}
              type="button"
              onClick={() => navigate("/register")} // Navigate using useNavigate
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
