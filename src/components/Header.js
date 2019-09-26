import React from "react";
import logo from "../images/logo.svg";
const Header = props => {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {props.headerText}
    </div>
  );
};

export default Header;
