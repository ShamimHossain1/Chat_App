import React, { useState } from "react";
import "./Login.css";
import assets from "../../../public/assets/assets.js";
import { signup, login } from "../../config/firebase.js";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [current, setCurrent] = useState("Login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();
  const submitHandler = async (e) => {
   
    e.preventDefault();
    if (current === "Sign Up") {
      await signup(userName, email, password);
      setUserName("");
      setEmail("");
      setPassword("");
      e.target.reset();
      setCurrent("Login");
    } else {
      await login(email, password);
      navigate("/chat");
      setEmail("");
      setPassword("");
      e.target.reset();
      toast.success("Login Successful");
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="" />
      <form onSubmit={submitHandler} action="" className="login-form">
        <h2>{current}</h2>
        {current === "Sign Up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="username"
            required
            className="form-input"
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="your@mail.com"
          required
          className="form-input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          required
          className="form-input"
        />
        <button className="submit">{current} </button>
        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms and conditions</p>
        </div>
        <div className="login-forgot">
          <p className="login-toggle">
            {" "}
            {current === "Sign Up"
              ? "Already have an account  "
              : "Create an account  "}
            <span
              onClick={() =>
                setCurrent(current === "Sign Up" ? "Login" : "Sign Up")
              }
            >
              Click Here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
