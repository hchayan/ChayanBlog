import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { dbService } from "../../../blogFirebase.js";

const PreviewMenu = ({
  setSelectedCategory,
  searchKeyword,
  setSearchKeyword,
  filterArticlesWithSearch,
}) => {
  const [menuNav, setMenuNav] = useState([]);

  const loadDBCategory = async () => {
    try {
      const dbLoadCategories = await dbService
        .collection("statics")
        .doc("categories")
        .get();
      setMenuNav(dbLoadCategories.data().name);
    } catch (error) {
      alert("카테고리 목록을 불러오는데 실패했습니다");
    }
  };

  const onChangeSearch = e => {
    setSearchKeyword(e.target.value);
  };

  const onChangeCategory = e => {
    setSelectedCategory(e.target.value);
  };

  const searchArticles = async keyword => {
    await filterArticlesWithSearch(keyword);
    setSearchKeyword("");
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
            <input
              type="text"
              onChange={onChangeSearch}
              placeholder="원하는 제목을 검색하세요"
              value={searchKeyword}
            />
            <input
              type="button"
              value="검색"
              onClick={() => searchArticles("title")}
            />
          </form>
        </div>
        <div className="menu-more"></div>
      </div>
    </div>
  );
};

export default PreviewMenu;
