import React, { useEffect, useState } from "react";
import ButtonInfoHome from "../buttonInfoHome/buttonInfoHome";
import "./homeInfoGray.scss";
import Col from 'react-bootstrap/Col';




function HomeInfoGray(props) {
  return (
    <div className="home__info">
        <h2> 
            {props.title}
        </h2>
        <div className="home__info-text">
            {props.text} 
        </div>
        <ButtonInfoHome textButton={props.buttonText} />
    </div>
  );
}

export default HomeInfoGray;