import React from "react";
import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = () => {
  return (
    <div className="preview">
      <PreviewMenu />
      <PreviewInfo />
      <PreviewArticles />
    </div>
  );
};

export default Preview;
