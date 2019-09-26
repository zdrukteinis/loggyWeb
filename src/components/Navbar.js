import robot from "../images/robot.svg";
import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

console.log(robot);
const Navbar = props => {
  return (
    <div className="NavBar justify-content-between">
      <Nav
        className="mr-auto"
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <img className="logo" src={robot} alt="brandImage" />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/Register">
            Registration
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/Login">
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
