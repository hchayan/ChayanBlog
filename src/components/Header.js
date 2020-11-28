import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = ({ loggedIn }) => {
  return (
    <div className="header">
      <div className="header__column">
        <div className=" header-logo">
          <Link to="/">
            <img src="https://firebasestorage.googleapis.com/v0/b/chayanblog.appspot.com/o/static%2Flogo.svg?alt=media&token=1506f45c-8be3-40b1-8bb1-2c55f750109e" />
          </Link>
        </div>
        <Nav />
      </div>

      <div className="header__column">
        {loggedIn ? <div className="write-post">새 글 작성</div> : null}

        <div className="profile"></div>
      </div>
    </div>
  );
};

export default Header;
