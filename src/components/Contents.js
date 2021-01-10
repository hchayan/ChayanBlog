import React from "react";
import Notice from "./page/preview/Notice";
import Preview from "./page/preview/Preview";

const Contents = ({
  articles,
  setArticles,
  userObj,
  loggedIn,
  bookmarks,
  setBookMarks,
}) => {
  return (
    <div className="contents">
      <Notice />
      <Preview
        articles={articles}
        setArticles={setArticles}
        userObj={userObj}
        loggedIn={loggedIn}
        bookmarks={bookmarks}
        setBookMarks={setBookMarks}
      />
    </div>
  );
};

export default Contents;
