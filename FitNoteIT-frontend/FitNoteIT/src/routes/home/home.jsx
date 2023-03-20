import React, { useState } from "react";
import HomeInfoGray from "../../components/homeInfoGray/homeInfoGray";
import HomeInfoGold from "../../components/homeInfoGold/homeInfoGold";
// import { Navbar } from '../../components';
import "./home.scss"
import backgroundPhoto from "../../assets/homeBackground.png"
import { Footer } from "../../components";


function Home() {
  const [textLeft, setTextLeft] = useState("Notowanie rekordów umożliwia śledzenie postępów i porównanie wyników z poprzednimi treningami. Dzięki temu użytkownicy mogą zobaczyć, jak wiele już osiągnęli i co jeszcze pozostało do osiągnięcia.");
  const [textCenter, setTextCenter] = useState("Śledzenie postępów treningowych pozwala na lepsze poznanie swojego ciała i jego reakcji na ćwiczenia. Można zobaczyć, które ćwiczenia działają najlepiej, a które należy poprawić lub zmienić.")
  const [textRight, setTextRight] = useState("jakis tekst")

  return (
    <div className="App">
        <div className="home">            
            <img className="home__img" src={backgroundPhoto} alt="bodybuilder"/>
              <div className="home__container">
                <HomeInfoGray title="NOTUJ SWOJE REKORDY" text={textLeft} buttonText="TWOJE REKORDY" />
                <HomeInfoGray title="ANALIZUJ SWOJE TRENINGI" text={textCenter} buttonText="TWOJE TRENINGI" />
                <HomeInfoGold text={textRight}/>
              </div>
        </div> 
        <Footer/>
    </div>
  );
}

export default Home;