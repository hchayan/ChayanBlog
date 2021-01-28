import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">블로그</Link>
        </li>
        <li>
          <a href="https://github.com/hchayan" target="_blank">
            깃허브
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
