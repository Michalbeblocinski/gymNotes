import React, { useState } from "react";
// import { Navbar } from '../../components';
import "./records.scss"
import { Footer } from "../../components";
import athlet from "../../assets/athlet.png"
import RecordsForm from "../../components/recordsForm/recordsForm";


function Records() {

  return (
    <div className="records-page" >
      <div className="records">
      <div className="records__background-element"></div>
        <div className="records__img">
          <img className="records__img-photo" src={athlet} alt="athlete"/>
        </div>
        <RecordsForm/>
    </div>

    <Footer/>
    </div>
  );
}

export default Records;