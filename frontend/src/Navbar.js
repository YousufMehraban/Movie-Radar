import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Navbar } from "reactstrap";
import userContext from "./helpers/userContext";
import "./Navbar.css";

const NavBar = ({ logOut }) => {
  const { currentUser } = useContext(userContext);

  return (
    <Navbar>
      <NavLink exact to="/" id="title">
        Movie Radar
      </NavLink>
      <Nav>
        {currentUser ? (
          <>
            <NavItem>
              <NavLink exact to="/watchlist">
                Watch List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/recommendation">
                Recommendation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem className="btn btn-outline-danger">
              <NavLink exact to="/logout" onClick={logOut}>
                LogOut
              </NavLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink exact to="/users/login">
                Log In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/users/register">
                Sign Up
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};
export default NavBar;
