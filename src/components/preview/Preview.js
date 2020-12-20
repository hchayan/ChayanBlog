import React from "react";
import { Route } from "react-router-dom";
import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = () => {
  return (
    <div className="preview">
      <PreviewMenu />
      <PreviewInfo />
      <Route path={["/", "/category"]}>
        <PreviewArticles />
      </Route>
      <Route
        path="/category/:tag"
        render={routerProps => <PreviewArticles match={routerProps.match} />}
      />
    </div>
  );
};

export default Preview;
