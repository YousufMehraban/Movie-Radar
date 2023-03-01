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
              <NavLink exact to="/watchlist/:user_id">
                Watch List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/recommendation/:user_id">
                Recommendation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavLink exact to="/logout" onClick={logOut}>
              <NavItem className="btn btn-outline-danger">LogOut</NavItem>
            </NavLink>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink exact to="/login">
                Log In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/register">
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
