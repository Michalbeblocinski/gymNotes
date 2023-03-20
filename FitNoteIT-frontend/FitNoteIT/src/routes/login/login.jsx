import React, { useState } from "react";
// import { Navbar } from '../../components';
import "./login.scss"
import { Footer } from "../../components";
import LoginForm from "../../components/loginForm/loginForm";
import mirrorMan from "../../assets/mirrorMan.png"


function Login() {

  return (
    <div >
      <div className="login">
        <LoginForm/>
        <div className="login__img">
          <img className="login__img-photo" src={mirrorMan} alt="bodybuilder"/>
        </div>
    </div>

    <Footer/>
    </div>
  );
}

export default Login;