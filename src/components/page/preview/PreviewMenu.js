import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { dbService } from "../../../blogFirebase.js";

const PreviewMenu = ({
  setSelectedCategory,
  searchKeyword,
  setSearchKeyword,
  filterArticlesWithSearch,
  filterArticleWithBookMark,
  loggedIn,
  onlyMarkCheck,
  setOnlyMarkCheck,
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

  const onChangeMarkCheck = () => {
    if (loggedIn) {
      setOnlyMarkCheck(prev => !prev);
    } else {
      alert("로그인이 필요한 기능입니다");
    }
  };

  const searchArticles = async keyword => {
    await filterArticlesWithSearch(keyword);
    setSearchKeyword("");
  };

  const checkedOnlyBookMark = () => {
    filterArticleWithBookMark(onlyMarkCheck);
  };

  useEffect(() => {
    loadDBCategory();
  }, []);

  useEffect(() => {
    checkedOnlyBookMark();
  }, [onlyMarkCheck]);

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
        <div className="preview-options">
          <div className="preview-option">
            <div
              className={
                onlyMarkCheck
                  ? "preview-option-bookmark checked"
                  : "preview-option-bookmark"
              }
              onClick={onChangeMarkCheck}
              title="북마크한 글"
            >
              {onlyMarkCheck ? (
                <i class="fas fa-bookmark"></i>
              ) : (
                <i class="far fa-bookmark"></i>
              )}
            </div>
          </div>
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
