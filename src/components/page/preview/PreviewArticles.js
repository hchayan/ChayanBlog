import React, { useEffect } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = ({
  match,
  filteredArticles,
  error,
  bookmarks,
  loadable,
  setLoadable,
  articlesLimit,
  setArticlesLimit,
}) => {
  const onScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 10
    ) {
      if (loadable) {
        console.log("bottom", articlesLimit);
        setArticlesLimit(articlesLimit + 20);
        setLoadable(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loadable]);

  return (
    <>
      {error ? (
        <div className="error">{error}</div>
      ) : filteredArticles && filteredArticles.length === 0 ? (
        <div>게시글이 존재하지 않습니다</div>
      ) : (
        <div className="preview__articles">
          {filteredArticles &&
            filteredArticles.map((article, i) => {
              return (
                <PreviewArticle
                  key={article.id}
                  article={article}
                  marked={bookmarks.includes(article.id) ? true : false}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default PreviewArticles;
