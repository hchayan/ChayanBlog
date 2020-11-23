import React from "react";
import PreviewArticles from "./preview/PreviewArticles";
import PreviewInfo from "./preview/PreviewInfo";
import PreviewMenu from "./preview/PreviewMenu";

const Contents = () => {
  return (
    <div className="contents">
      contents
      <PreviewMenu />
      <PreviewInfo />
      <PreviewArticles />
    </div>
  );
};

export default Contents;
