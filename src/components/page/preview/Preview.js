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
    getArticles();
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
