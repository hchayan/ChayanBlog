import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { dbService } from "blogFirebase.js";

const PreviewMenu = ({ setSelectedCategory }) => {
  const [menuNav, setMenuNav] = useState([]);

  const onChangeCategory = e => {
    setSelectedCategory(e.target.value);
  };

  const loadDBCategory = async () => {
    const dbLoadCategories = await dbService
      .collection("statics")
      .doc("categories")
      .get();
    setMenuNav(dbLoadCategories.data().name);
  };

  useEffect(() => {
    loadDBCategory();
  }, []);

  return (
    <div className="preview-menu">
      <div className="preview-menu__column">
        <div className="preview-menu-nav">
          <select onChange={onChangeCategory}>
            <option value="all">전체</option>
            {menuNav.map(menu => {
              return <option value={menu}>{menu}</option>;
            })}
          </select>
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
            <input type="text" placeholder="원하는 내용을 검색하세요" />
            <input type="submit" value="검색" />
          </form>
        </div>
        <div className="menu-more"></div>
      </div>
    </div>
  );
};

export default PreviewMenu;
