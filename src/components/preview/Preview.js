import React, { useState } from "react";
import { Route } from "react-router-dom";
import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="preview">
      <PreviewMenu setSelectedCategory={setSelectedCategory} />
      <PreviewInfo />
      <Route path={["/", "/category"]}>
        <PreviewArticles selectedCategory={selectedCategory} />
      </Route>
      <Route
        path="/category/:tag"
        render={routerProps => (
          <PreviewArticles
            match={routerProps.match}
            selectedCategory={selectedCategory}
          />
        )}
      />
    </div>
  );
};

export default Preview;
