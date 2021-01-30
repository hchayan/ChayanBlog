import React, { useState, useEffect, useMemo } from "react";
import { Route } from "react-router-dom";

import { dbService } from "../../../blogFirebase.js";

import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = ({
  articles,
  setArticles,
  userObj,
  loggedIn,
  bookmarks,
  setBookMarks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchKeyword, setSearchKeyword] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [orderBy, setOrderBy] = useState(true);

  const [filteredArticles, setFilteredArticles] = useState(null);

  const [onlyMarkCheck, setOnlyMarkCheck] = useState(false);

  const [error, setError] = useState(null);

  const [loadable, setLoadable] = useState(true);
  const [articlesLimit, setArticlesLimit] = useState(0);

  const getUserBookMark = async () => {
    try {
      if (loggedIn && userObj) {
        await dbService
          .collection("bookmark")
          .doc(userObj.uid)
          .get()
          .then(doc => {
            setBookMarks(doc.data().postsId);
          });
      } else {
        setBookMarks([]);
      }
    } catch (error) {
      setBookMarks([]);
    }
  };

  const addArticles = async () => {
    try {
      const dbArticles = await dbService
        .collection("posts")
        .orderBy("modifiedAt", "desc")

        .get();

      let tmpArticles = [];
      await dbArticles.forEach(article => {
        const aritlcleObject = {
          ...article.data(),
          id: article.id,
        };

        tmpArticles.push(aritlcleObject);
      });

      setArticles(tmpArticles);
    } catch (error) {
      setError("게시글들을 불러오지 못했습니다 : " + error);
    }
    setLoadable(true);
  };

  const filterArticles = async () => {
    try {
      const newArticles = await articles.filter(
        article =>
          article.postTypes[0] === selectedCategory ||
          "all" === selectedCategory
      );

      setOnlyMarkCheck(false);
      if (newArticles.length === 0) {
        setFilteredArticles([]);
      } else {
        setFilteredArticles(newArticles);
      }
    } catch (error) {
      setError("게시글들을 불러오지 못했습니다 : " + error);
    }
  };

  const reverseArticles = () => {
    articles && setArticles(prev => [...prev].reverse());
  };

  const countPosts = () => {
    filteredArticles && setPostCount(filteredArticles.length);
  };

  // Search
  const filterArticlesWithSearch = async keyword => {
    try {
      let newArticles = [];
      if (keyword === "title") {
        newArticles = await articles.filter(
          article =>
            (article.postTypes[0] === selectedCategory ||
              "all" === selectedCategory) &&
            article.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      } else if (keyword === "tag") {
        newArticles = await articles.filter(
          article =>
            (article.postTypes[0] === selectedCategory ||
              "all" === selectedCategory) &&
            article.postTag.includes(searchKeyword)
        );
      }

      if (newArticles.length === 0) {
        setFilteredArticles([]);
      } else {
        setFilteredArticles(newArticles);
      }
    } catch (error) {
      setError("게시글들을 불러오지 못했습니다 : " + error);
    }
  };

  const filterArticleWithBookMark = async checked => {
    if (checked) {
      const newArticles = await filteredArticles.filter(article =>
        bookmarks.includes(article.id)
      );
      setFilteredArticles(newArticles);
    } else {
      filterArticles();
    }
  };

  useEffect(() => {
    addArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [loggedIn, articles, selectedCategory]);

  useMemo(() => {
    reverseArticles();
  }, [orderBy]);

  useMemo(() => {
    countPosts();
  }, [filteredArticles]);

  useEffect(() => {
    getUserBookMark();
  }, [loggedIn, userObj]);

  return (
    <div className="preview">
      <PreviewMenu
        setSelectedCategory={setSelectedCategory}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        filterArticlesWithSearch={filterArticlesWithSearch}
        filterArticleWithBookMark={filterArticleWithBookMark}
        loggedIn={loggedIn}
        onlyMarkCheck={onlyMarkCheck}
        setOnlyMarkCheck={setOnlyMarkCheck}
      />
      <PreviewInfo
        postCount={postCount}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <Route path={["/", "/category"]}>
        <PreviewArticles
          filteredArticles={filteredArticles}
          error={error}
          bookmarks={bookmarks}
          loadable={loadable}
          setLoadable={setLoadable}
          articlesLimit={articlesLimit}
          setArticlesLimit={setArticlesLimit}
        />
      </Route>
      <Route
        path="/category/:tag"
        render={routerProps => (
          <PreviewArticles
            match={routerProps.match}
            filteredArticles={filteredArticles}
            error={error}
            bookmarks={bookmarks}
          />
        )}
      />
    </div>
  );
};

export default Preview;
