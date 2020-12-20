import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

const PreviewMenu = () => {
  const [menuNav, setMenuNav] = useState([
    { name: "전체", tag: "all" },
    { name: "포스트", tag: "post" },
    { name: "기본개념", tag: "basic" },
    { name: "클론코딩", tag: "clone" },
    { name: "태그", tag: "tag" },
  ]);

  return (
    <div className="preview-menu">
      <div className="preview-menu__column">
        <div className="preview-menu-nav">
          <ul>
            {menuNav.map(menu => {
              return (
                <li>
                  <Link to={`/category/${menu.tag}`}>{menu.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="preview-menu__column">
        <div className="search-bar">
          <form>
            <input tpye="text" placeholder="원하는 내용을 검색하세요" />
            <input type="submit" value="검색" />
          </form>
        </div>
        <div className="menu-more"></div>
      </div>
    </div>
  );
};

export default PreviewMenu;
