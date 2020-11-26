import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">blog</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
