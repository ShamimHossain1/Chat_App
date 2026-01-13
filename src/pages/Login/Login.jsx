import React, { useState } from "react";
import "./Login.css";
import assets from "../../../public/assets/assets.js";
const Login = () => {

    const [current, setCurrent] = useState('Login');

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="" />
      <form action="" className="login-form">
        <h2>{current}</h2>
        { current === 'Sign Up' && <input type="text" placeholder="username" required className="form-input" />}
        <input type="email" placeholder="your@mail.com" required className="form-input" />
        <input type="password" placeholder="********" required className="form-input" />
        <button className="submit">{current} </button>
        <div className="login-term">
            <input type="checkbox" />
            <p>Agree to the terms and conditions</p>
        </div>
        <div className="login-forgot">
            <p className="login-toggle"> { current === 'Sign Up' ? 'Already have an account  ' : 'Create an account  '}<span onClick={()=>setCurrent(current==='Sign Up'?'Login':'Sign Up')}>Click Here</span></p>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
