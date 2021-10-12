import React from "react";
import { Link } from "react-router-dom";
import AppLogo from "../AppLogo";
import "./styles.scss";

const Header = (props) => {
  return (
    <header id="app-header">
      <div className="container">
        <Link to="/recent">
          <div className="app-logo">
            <AppLogo />
          </div>
        </Link>
        {props.user.display_name && (
          <div className="currentUser">
            Logged in as:{" "}
            <span className="user">{props.user.display_name}</span>
            <span className="user-pic">
              {props.user.images[0] && (
                <img src={props.user.images[0].url} alt="" />
              )}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
