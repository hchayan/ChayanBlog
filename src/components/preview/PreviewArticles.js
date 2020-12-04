import { dbService } from "blogFirebase.js";
import React, { useEffect, useState } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const dbArticles = await dbService.collection("posts").get();
    dbArticles.forEach(article => {
      const aritlcleObject = {
        ...article.data(),
        id: article.id,
      };

      setArticles(prev => [aritlcleObject, ...prev]);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="preview__articles">
      {articles.map(article => {
        return <PreviewArticle article={article} />;
      })}
    </div>
  );
};

export default PreviewArticles;
