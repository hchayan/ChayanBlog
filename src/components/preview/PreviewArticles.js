import { dbService } from "blogFirebase.js";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = ({
  match,
  setPostCount,
  orderBy,
  articles,
  setArticles,
  filteredArticles,
  error,
}) => {
  let dummyCount = 15;

  const reverseArticles = () => {
    articles && setArticles(prev => [...prev].reverse());
  };

  const countPosts = () => {
    filteredArticles && setPostCount(filteredArticles.length);
  };

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
