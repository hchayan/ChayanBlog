import { dbService } from "blogFirebase.js";
import React, { useEffect, useState } from "react";
import PreviewArticle from "./PreviewArticle.js";

const PreviewArticles = ({ match }) => {
  let dummyCount = 15;
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    console.log(match ? match.params.tag : null);
    const dbArticles = await dbService.collection("posts").get();
    dbArticles.forEach(article => {
      const aritlcleObject = {
        ...article.data(),
        id: article.id,
      };

      setArticles(prev => [...prev, aritlcleObject]);
    });
  };

  useEffect(() => {
    setArticles([]);
    getArticles();
  }, []);

  return (
    <div className="preview__articles">
      {articles.map(article => {
        return <PreviewArticle key={article.id} article={article} />;
      })}
      {[...Array(dummyCount - articles.length)].map((element, index) => {
        return (
          <div key={index} className="preview__article preview__dummy"></div>
        );
      })}
    </div>
  );
};

export default PreviewArticles;
