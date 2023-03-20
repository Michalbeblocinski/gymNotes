import React, { useState } from "react";
// import { Navbar } from '../../components';
import "./register.scss"
import { Footer } from "../../components";
import RegisterForm from "../../components/registerForm/registerForm";
import mobilephoneWoman from "../../assets/mobilephoneWoman.png"


function Register() {

  return (
    <div >
      <div className="register">
        <RegisterForm/>
        <div className="register__img">
          <img className="register__img-photo" src={mobilephoneWoman} alt="woman"/>
        </div>
    </div>

    <Footer/>
    </div>
  );
}

export default Register;