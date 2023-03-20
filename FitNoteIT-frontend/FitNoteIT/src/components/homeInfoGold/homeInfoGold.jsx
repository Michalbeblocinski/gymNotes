import React, { useEffect, useState } from "react";
import ButtonInfoHome from "../buttonInfoHome/buttonInfoHome";
import "./homeInfoGold.scss";
import woman from "../../assets/woman.png"


function HomeInfoGray(props) {
    return (
        <div className="home__gold-element">
            <div className="home__gold-element-text">
            "Trening siłowy to nie tylko fizyczne ćwiczenie, ale także trening dla umysłu, który uczy nas siły woli, dyscypliny i wytrwałości." - Arnold Schwarzenegger
            </div>
            <div className="home__gold-element-img">
                <img className="home__img" src={woman} alt="woman"/>
            </div>

        </div>
        
    );
}

export default HomeInfoGray;