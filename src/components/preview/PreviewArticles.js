import { dbService } from "blogFirebase.js";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = ({
  match,
  selectedCategory,
  setPostCount,
  orderBy,
}) => {
  let dummyCount = 15;
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
    const newArticles = await articles.filter(
      article =>
        article.postTypes[0] === selectedCategory || "all" === selectedCategory
    );

    if (newArticles.length === 0) {
      setFilteredArticles([]);
    } else {
      setFilteredArticles(newArticles);
    }
  };

  const reverseArticles = () => {
    articles && setArticles(prev => [...prev].reverse());
  };

  const countPosts = () => {
    filteredArticles && setPostCount(filteredArticles.length);
  };

  useEffect(() => {
    getArticles();
  }, []);

  useMemo(() => {
    filterArticles();
  }, [articles, selectedCategory]);

  useMemo(() => {
    reverseArticles();
  }, [orderBy]);

  useMemo(() => {
    countPosts();
  }, [filteredArticles]);

  return (
    <>
      {error ? (
        <div className="error">{error}</div>
      ) : filteredArticles && filteredArticles.length === 0 ? (
        <div>게시글이 존재하지 않습니다</div>
      ) : (
        <div className="preview__articles">
          {filteredArticles &&
            filteredArticles.map(article => {
              return <PreviewArticle key={article.id} article={article} />;
            })}

          {[...Array(dummyCount - articles.length)].map(index => {
            return (
              <div
                key={index}
                className="preview__article preview__dummy"
              ></div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PreviewArticles;
