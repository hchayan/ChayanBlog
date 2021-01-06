import React from "react";
import Notice from "./page/preview/Notice";
import Preview from "./page/preview/Preview";

const Contents = ({ articles, setArticles }) => {
  return (
    <div className="contents">
      <Notice />
      <Preview articles={articles} setArticles={setArticles} />
    </div>
  );
};

export default Contents;
