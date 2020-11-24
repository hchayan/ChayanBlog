import React from "react";
import Nav from "./Nav";

const Header = ({ loggedIn }) => {
  return (
    <div className="header">
      <div className="header__column">Logo</div>
      <div className="header__column">
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
