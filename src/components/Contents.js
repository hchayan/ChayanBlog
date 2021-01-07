import React from "react";
import Notice from "./page/preview/Notice";
import Preview from "./page/preview/Preview";

const Contents = ({ articles, setArticles, userObj }) => {
  return (
    <div className="contents">
      <Notice />
      <Preview
        articles={articles}
        setArticles={setArticles}
        userObj={userObj}
      />
    </div>
  );
};

export default Contents;
