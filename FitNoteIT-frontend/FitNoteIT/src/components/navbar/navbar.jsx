import React, { Fragment, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SwipeableTemporaryDrawer from "../menu/menu";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import logo from "../../assets/Logo.png"
import { UsersContext } from "../../contexts/user.context";

function Navbar() {
  const { currentUser2,setCurrentUser2 } = useContext(UsersContext);
  const currentUser = localStorage.getItem("currentUser");

  useEffect( () => {
   setCurrentUser2(currentUser)
  }, []);
  
  const location = useLocation();
 
  const logoutHandler = () => {
    localStorage.setItem("currentUser", "");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setCurrentUser2("");
  }

  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar__top">

        </div>
        <div className="navbar__bottom">
          <div className="left">
            {currentUser ? (
              <Link to='/'>
                <p>Rekordy</p>
              </Link>) : (<p></p>)}
          </div>
          <div className="left2">
            {currentUser ? (
              <Link to='/'>
                <p>Historia</p>
              </Link>) : (<p></p>)}
          </div>
          <div className="center">
            {location.pathname === '/' ? (
              currentUser ? (
                <Link to='/'>
                  <button className="navbar__start-button">Zacznij trening!</button>
                </Link>) : (<p></p>)
            ) : (
              <Link to='/'>
                <img className="navabar__logo" src={logo} alt="logo" />
              </Link>
            )}

          </div>
          <div className="right">
            {currentUser ? (
              <Link to='/'>
                <p>stwórz plan</p>
              </Link>) : (<p></p>)}
          </div>
          <div className="right2">
            {currentUser ? (
              <button className="navbar__logout-button" onClick={logoutHandler}>Wyloguj {currentUser2 ? `${currentUser2}` : ''}</button>
            ) : location.pathname === '/' ? (
              <Link to='/login'>
                <button className="navbar__logout-button">Zaloguj</button>
              </Link>
            ) : location.pathname === '/login' ? (
              <Link to='/register'>
                <button className="navbar__logout-button">Zarejestruj</button>
              </Link>
            ) : (
              <Link to='/login'>
                <button className="navbar__logout-button">Zaloguj</button>
              </Link>
            )}

          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;