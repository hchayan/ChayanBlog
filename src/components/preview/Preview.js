import React, { useState, useEffect, useMemo } from "react";
import { Route } from "react-router-dom";

import { dbService } from "blogFirebase.js";

import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [orderBy, setOrderBy] = useState(true);

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState(null);

  const [error, setError] = useState(null);

  const getArticles = async () => {
    try {
      setArticles([]);
      const dbArticles = await dbService
        .collection("posts")
        .orderBy("modifiedAt", "asc")
        .get();

      let tmpArticles = [];
      await dbArticles.forEach(article => {
        const aritlcleObject = {
          ...article.data(),
          id: article.id,
        };

        tmpArticles.unshift(aritlcleObject);
      });
      setArticles(tmpArticles);
    } catch (error) {
      setError("게시글들을 불러오지 못했습니다 : " + error);
    }
  };

  const filterArticles = async () => {
    try {
      const newArticles = await articles.filter(
        article =>
          article.postTypes[0] === selectedCategory ||
          "all" === selectedCategory
      );

      if (newArticles.length === 0) {
        setFilteredArticles([]);
      } else {
        setFilteredArticles(newArticles);
      }
    } catch (error) {
      setError("게시글들을 불러오지 못했습니다 : " + error);
    }
  };

  const filterArticlesWithSearch = async keyword => {
    try {
      if (keyword === "title") {
        const newArticles = await articles.filter(
          article =>
            (article.postTypes[0] === selectedCategory ||
              "all" === selectedCategory) &&
            article.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        if (newArticles.length === 0) {
          setFilteredArticles([]);
        } else {
          setFilteredArticles(newArticles);
        }
      }
    } catch (error) {
      setError("게시글들을 불러오지 못했습니다 : " + error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  useMemo(() => {
    filterArticles();
  }, [articles, selectedCategory]);

  return (
    <div className="preview">
      <PreviewMenu
        setSelectedCategory={setSelectedCategory}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        filterArticlesWithSearch={filterArticlesWithSearch}
      />
      <PreviewInfo
        postCount={postCount}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <Route path={["/", "/category"]}>
        <PreviewArticles
          selectedCategory={selectedCategory}
          setPostCount={setPostCount}
          orderBy={orderBy}
          articles={articles}
          setArticles={setArticles}
          filteredArticles={filteredArticles}
          error={error}
        />
      </Route>
      <Route
        path="/category/:tag"
        render={routerProps => (
          <PreviewArticles
            match={routerProps.match}
            selectedCategory={selectedCategory}
            setPostCount={setPostCount}
            orderBy={orderBy}
            articles={articles}
            setArticles={setArticles}
            filteredArticles={filteredArticles}
            error={error}
          />
        )}
      />
    </div>
  );
};

export default Preview;
