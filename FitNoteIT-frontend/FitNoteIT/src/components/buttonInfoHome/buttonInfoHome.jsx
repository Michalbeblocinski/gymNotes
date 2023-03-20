import React, { useEffect, useState } from "react";

function ButtonInfoHome(props) {
  return (
    <button className="home__info-button">{props.textButton}</button>
  );
}

export default ButtonInfoHome;